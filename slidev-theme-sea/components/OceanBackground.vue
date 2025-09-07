<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";
import {
  WAVE_THEMES,
  getNextTheme,
  type WaveTheme,
} from "../composables/useOceanThemes";
import {
  createRenderer,
  setupCamera,
  createWaterMesh,
  handleResize as handleResizeUtil,
  cleanupThree,
} from "../composables/useThreeUtils";
import { usePerformance } from "../composables/usePerformance";

// プロパティ
const props = defineProps<{
  visible: boolean;
}>();

// イベントの発行
const emit = defineEmits<{
  switchTheme: [];
}>();

// 現在の波テーマ
const currentWaveTheme = ref<WaveTheme>("tropical");
const waveConfig = computed(() => WAVE_THEMES[currentWaveTheme.value]);

// アニメーション時間
const animationTime = ref(0);

// Three.jsの参照
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let waterMesh: THREE.Mesh | null = null;
let animationId: number | null = null;

const canvasRef = ref<HTMLCanvasElement>();

// パフォーマンス監視
const { startMonitoring, stopMonitoring, metrics, isPerformanceAcceptable } = usePerformance();

// Three.js水面の初期化
const initWaterSurface = () => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  camera = setupCamera();
  renderer = createRenderer(canvasRef.value, waveConfig.value);

  if (!renderer) return;

  waterMesh = createWaterMesh(waveConfig.value);
  scene.add(waterMesh);
};

// 設定可能な速度でのアニメーションループ
const animateWater = () => {
  if (!waterMesh || !renderer || !scene || !camera) return;

  // 波の設定に基づいてアニメーション時間を更新
  animationTime.value += waveConfig.value.animationSpeed;

  // シェーダーのuniformsを更新
  const material = waterMesh.material as THREE.ShaderMaterial;
  material.uniforms.uTime.value = animationTime.value;

  // シーンをレンダリング
  renderer.render(scene, camera);

  // パフォーマンスをチェックし、必要に応じて品質を調整
  if (!isPerformanceAcceptable(30) && animationTime.value > 5) {
    console.warn('Performance is below 30 FPS:', metrics.value.fps);
  }

  animationId = requestAnimationFrame(animateWater);
};

// ウィンドウリサイズの処理
const handleResize = () => {
  if (!camera || !renderer) return;
  handleResizeUtil(camera, renderer);
};

// Three.jsリソースのクリーンアップ
const cleanupWater = () => {
  cleanupThree(animationId, renderer, waterMesh);
  animationId = null;
  renderer = null;
  waterMesh = null;
  scene = null;
  camera = null;
};

// 波テーマ切り替え関数
const switchWaveTheme = () => {
  currentWaveTheme.value = getNextTheme(currentWaveTheme.value);
  console.log("Wave theme switched to:", currentWaveTheme.value);

  // 新しいテーマで水面を再初期化
  cleanupWater();
  setTimeout(() => {
    initWaterSurface();
    animateWater();
  }, 100);
};

// ライフサイクル
onMounted(() => {
  if (props.visible) {
    setTimeout(() => {
      initWaterSurface();
      startMonitoring(renderer);
    }, 100);
    setTimeout(() => animateWater(), 200);
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  stopMonitoring();
  cleanupWater();
  window.removeEventListener("resize", handleResize);
});

// 表示状態を監視
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      setTimeout(() => {
        initWaterSurface();
        animateWater();
      }, 100);
    } else if (!newVal && oldVal) {
      cleanupWater();
    }
  },
);

// メソッドを公開
defineExpose({
  switchWaveTheme,
  currentWaveTheme,
});
</script>

<template>
  <div v-if="visible" class="ocean-container">
    <!-- 背景色レイヤー -->
    <div
      class="ocean-background"
      :style="{ backgroundColor: waveConfig.colors.background }"
    />

    <!-- Three.js水面キャンバス -->
    <canvas ref="canvasRef" class="water-canvas" />
  </div>
</template>

<style scoped>
.ocean-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -20;
}

.ocean-background {
  position: absolute;
  inset: 0;
  z-index: -20;
}

.water-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -8;
}
</style>