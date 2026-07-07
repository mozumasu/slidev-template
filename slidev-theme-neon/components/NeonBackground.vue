<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  NEON_THEMES,
  getNextNeonTheme,
  type NeonTheme,
} from '../composables/useNeonThemes'

// プロパティ
const { visible, slideNumber } = defineProps<{
  visible: boolean
  slideNumber?: number
}>()

// 現在のNeonテーマ
const currentNeonTheme = ref<NeonTheme>('synthwave')
const neonConfig = computed(() => NEON_THEMES[currentNeonTheme.value])

// ポリゴン生成用の変数
type Range = [number, number]

const currentSlideNo = computed(() => slideNumber || 1)
const seed = ref('default')
const animationTime = ref(0)
const hue = ref(0)

// シンプルなシード付きランダム関数
function seededRandom(seed: string) {
  let state = seed.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296
    return Math.abs(state / 4294967296)
  }
}

// ポリゴン頂点の分布範囲（画面全体）
const POINT_LIMITS: { x: Range; y: Range } = {
  x: [0, 1],
  y: [0, 1],
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePoly(getCount: () => number) {
  function getPoints(): Range[] {
    const limits = POINT_LIMITS
    const number = getCount()
    const rng = seededRandom(`${seed.value}-${currentSlideNo.value}`)
    const polyConfig = neonConfig.value.polygonConfig
    
    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    
    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < polyConfig.disturbChance 
        ? random + (rng() - 0.5) * polyConfig.disturb 
        : random
    }
    
    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), polyConfig.overflow),
        applyOverflow(randomBetween(limits.y), polyConfig.overflow),
      ])
  }
  
  const points = ref(getPoints())
  const poly = computed(() =>
    points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', ')
  )
  
  function jumpPoints() {
    const generated = getPoints()
    // 頂点数が変わったら morph できないため全差し替え
    if (generated.length !== points.value.length) {
      points.value = generated
      return
    }
    const newPoints = new Set(generated)
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range | undefined
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      if (closest) newPoints.delete(closest)
      return closest || o
    })
  }
  
  // スライド変更・シード変更を監視してポイントを更新
  watch([currentSlideNo, seed], () => {
    jumpPoints()
  })
  
  return poly
}

// Neonテーマ用のポリゴンを作成（頂点数はテーマ切替に追従する）
const poly1 = usePoly(() => neonConfig.value.polygonConfig.counts[0])
const poly2 = usePoly(() => neonConfig.value.polygonConfig.counts[1])
const poly3 = usePoly(() => neonConfig.value.polygonConfig.counts[2])

// Neonテーマの変更を監視してポリゴンを再生成
watch(currentNeonTheme, (newTheme) => {
  seed.value = `${newTheme}-${Date.now()}`
})

// Neonテーマ切り替え関数
const switchNeonTheme = () => {
  currentNeonTheme.value = getNextNeonTheme(currentNeonTheme.value)
}

// アニメーションループ
let rafId: number | undefined

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  const animate = () => {
    if (visible && !prefersReducedMotion.matches) {
      animationTime.value += neonConfig.value.effects.animationSpeed
      const range = neonConfig.value.effects.hueRotationRange
      hue.value =
        Math.sin(animationTime.value * 0.3) * (range * 0.7) +
        Math.cos(animationTime.value * 0.7) * (range * 0.3)
    }
    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId)
  }
})

// メソッドと状態を公開
defineExpose({
  switchNeonTheme,
  currentNeonTheme,
})
</script>

<template>
  <div v-if="visible" class="neon-container">
    <!-- 背景色レイヤー -->
    <div class="neon-background" />
    
    <!-- Neonテーマポリゴン -->
    <div 
      class="bg transform-gpu overflow-hidden pointer-events-none"
      :style="{ 
        filter: `blur(${neonConfig.effects.blurIntensity}px) hue-rotate(${hue}deg)`
      }"
      aria-hidden="true"
    >
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly1})`,
          background: `linear-gradient(to right, ${neonConfig.colors.layer1.from}, ${neonConfig.colors.layer1.to})`,
          opacity: neonConfig.effects.polygonOpacity[0],
        }"
      />
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly2})`,
          background: `linear-gradient(to left, ${neonConfig.colors.layer2.from}, ${neonConfig.colors.layer2.to})`,
          opacity: neonConfig.effects.polygonOpacity[1],
        }"
      />
      <div
        class="clip"
        :style="{
          'clip-path': `polygon(${poly3})`,
          background: `linear-gradient(to top, ${neonConfig.colors.layer3.from}, ${neonConfig.colors.layer3.to})`,
          opacity: neonConfig.effects.polygonOpacity[2],
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.neon-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -20;
}

.neon-background {
  position: absolute;
  inset: 0;
  background-color: #000000;
  z-index: -20;
}

.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
  transform-origin: center;
  will-change: transform, opacity;
}
</style>