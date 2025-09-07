<script setup lang="ts">
import { computed } from 'vue'

interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  icon?: string
  date?: string
}

interface Props {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  glowColor?: 'cyan' | 'matrix' | 'purple' | 'pink' | 'yellow' | 'orange'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  glowColor: 'matrix',
  animated: true
})

const glowClasses = computed(() => {
  const colorMap = {
    cyan: {
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-400/50',
      bg: 'bg-cyan-400',
      text: 'text-cyan-400',
      glow: 'neon-glow-cyan'
    },
    matrix: {
      border: 'border-green-400',
      shadow: 'shadow-green-400/50',
      bg: 'bg-green-400',
      text: 'text-green-400',
      glow: 'neon-glow-matrix'
    },
    purple: {
      border: 'border-purple-400',
      shadow: 'shadow-purple-400/50',
      bg: 'bg-purple-400',
      text: 'text-purple-400',
      glow: 'neon-glow-purple'
    },
    pink: {
      border: 'border-pink-400',
      shadow: 'shadow-pink-400/50',
      bg: 'bg-pink-400',
      text: 'text-pink-400',
      glow: 'neon-glow-pink'
    },
    yellow: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-400/50',
      bg: 'bg-yellow-400',
      text: 'text-yellow-400',
      glow: 'neon-glow-yellow'
    },
    orange: {
      border: 'border-orange-400',
      shadow: 'shadow-orange-400/50',
      bg: 'bg-orange-400',
      text: 'text-orange-400',
      glow: 'neon-glow-orange'
    }
  }
  return colorMap[props.glowColor]
})
</script>

<template>
  <div 
    class="neon-timeline"
    :class="[
      `timeline-${orientation}`,
      { 'animated': animated }
    ]"
  >
    <div 
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
      :style="animated ? { animationDelay: `${index * 0.2}s` } : {}"
    >
      <div class="timeline-marker">
        <div 
          class="marker-dot"
          :class="[glowClasses.bg, glowClasses.shadow]"
        >
          <span v-if="item.icon" class="marker-icon">{{ item.icon }}</span>
        </div>
        <div 
          v-if="index < items.length - 1"
          class="timeline-line"
          :class="glowClasses.bg"
        ></div>
      </div>
      
      <div class="timeline-content">
        <div 
          class="content-card"
          :class="[glowClasses.border, glowClasses.shadow]"
        >
          <div class="content-header">
            <h3 class="content-title" :class="glowClasses.glow">
              {{ item.title }}
            </h3>
            <span v-if="item.date" class="content-date" :class="glowClasses.text">
              {{ item.date }}
            </span>
          </div>
          
          <p v-if="item.subtitle" class="content-subtitle">
            {{ item.subtitle }}
          </p>
          
          <p v-if="item.description" class="content-description">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-timeline {
  position: relative;
  padding: 1rem;
}

/* 垂直タイムライン */
.timeline-vertical {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-vertical .timeline-item {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

/* 水平タイムライン */
.timeline-horizontal {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.timeline-horizontal .timeline-item {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-horizontal .timeline-marker {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.timeline-horizontal .timeline-line {
  width: 100%;
  height: 2px !important;
}

/* マーカー */
.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
  box-shadow: 0 0 20px;
  flex-shrink: 0;
}

.marker-dot::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.marker-icon {
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
}

.timeline-line {
  position: absolute;
  top: 2.5rem;
  width: 2px;
  height: calc(100% + 2rem);
  opacity: 0.5;
}

.timeline-horizontal .timeline-line {
  position: relative;
  top: auto;
  width: 100%;
  height: 2px;
}

/* コンテンツ */
.timeline-content {
  flex: 1;
}

.content-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 0 15px;
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateX(5px);
  box-shadow: 0 0 25px;
}

.timeline-horizontal .content-card:hover {
  transform: translateY(-5px);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.content-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

.content-date {
  font-size: 0.875rem;
  opacity: 0.8;
}

.content-subtitle {
  font-size: 1rem;
  color: #ccc;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.content-description {
  font-size: 0.9rem;
  color: #aaa;
  margin: 0;
  line-height: 1.5;
}

/* アニメーション */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

.animated .timeline-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-horizontal.animated .timeline-item {
  animation: fadeInLeft 0.6s ease forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>