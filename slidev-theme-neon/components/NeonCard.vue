<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  glowColor?: 'cyan' | 'matrix' | 'purple' | 'pink' | 'yellow' | 'orange'
  hover?: boolean
  flicker?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: 'purple',
  hover: true,
  flicker: false
})

const glowBorderClass = computed(() => {
  const colorMap = {
    cyan: 'border-cyan-400 shadow-cyan-400/50',
    matrix: 'border-green-400 shadow-green-400/50',
    purple: 'border-purple-400 shadow-purple-400/50',
    pink: 'border-pink-400 shadow-pink-400/50',
    yellow: 'border-yellow-400 shadow-yellow-400/50',
    orange: 'border-orange-400 shadow-orange-400/50'
  }
  return colorMap[props.glowColor]
})

const glowTextClass = computed(() => {
  return `neon-glow-${props.glowColor}`
})
</script>

<template>
  <div 
    class="neon-card"
    :class="[
      glowBorderClass,
      { 'hover-effect': hover, 'flicker': flicker }
    ]"
  >
    <div v-if="icon || title || subtitle" class="card-header">
      <span v-if="icon" class="card-icon">{{ icon }}</span>
      <div class="card-titles">
        <h3 v-if="title" class="card-title" :class="glowTextClass">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </div>
    </div>
    
    <div class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.neon-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.neon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.neon-card.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px;
}

.neon-card.hover-effect:hover::before {
  left: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-icon {
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.card-titles {
  flex: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #aaa;
  margin: 0.25rem 0 0 0;
}

.card-content {
  color: #ffffff;
  line-height: 1.6;
}

.card-content :deep(p) {
  margin: 0.5rem 0;
}

.card-content :deep(ul),
.card-content :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.card-content :deep(li) {
  margin: 0.25rem 0;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* カード内でのネストされた要素のスタイル */
.card-content :deep(.highlight) {
  color: inherit;
  text-shadow: 0 0 10px currentColor;
}

.card-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.card-content :deep(strong) {
  color: #ffffff;
  font-weight: 600;
}
</style>