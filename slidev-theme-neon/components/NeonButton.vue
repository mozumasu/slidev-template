<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  href?: string
  target?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost'
  glowColor?: 'cyan' | 'matrix' | 'purple' | 'pink' | 'yellow' | 'orange'
  flicker?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'solid',
  glowColor: 'cyan',
  flicker: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return sizes[props.size]
})

const glowClasses = computed(() => {
  const colorMap = {
    cyan: {
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-400/50',
      text: 'text-cyan-400',
      bg: 'bg-cyan-400/20',
      hover: 'hover:bg-cyan-400/30',
      glow: 'neon-glow-cyan'
    },
    matrix: {
      border: 'border-green-400',
      shadow: 'shadow-green-400/50',
      text: 'text-green-400',
      bg: 'bg-green-400/20',
      hover: 'hover:bg-green-400/30',
      glow: 'neon-glow-matrix'
    },
    purple: {
      border: 'border-purple-400',
      shadow: 'shadow-purple-400/50',
      text: 'text-purple-400',
      bg: 'bg-purple-400/20',
      hover: 'hover:bg-purple-400/30',
      glow: 'neon-glow-purple'
    },
    pink: {
      border: 'border-pink-400',
      shadow: 'shadow-pink-400/50',
      text: 'text-pink-400',
      bg: 'bg-pink-400/20',
      hover: 'hover:bg-pink-400/30',
      glow: 'neon-glow-pink'
    },
    yellow: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-400/50',
      text: 'text-yellow-400',
      bg: 'bg-yellow-400/20',
      hover: 'hover:bg-yellow-400/30',
      glow: 'neon-glow-yellow'
    },
    orange: {
      border: 'border-orange-400',
      shadow: 'shadow-orange-400/50',
      text: 'text-orange-400',
      bg: 'bg-orange-400/20',
      hover: 'hover:bg-orange-400/30',
      glow: 'neon-glow-orange'
    }
  }
  return colorMap[props.glowColor]
})

const variantClasses = computed(() => {
  const colors = glowClasses.value
  const variants = {
    solid: `${colors.bg} ${colors.border} ${colors.hover} text-white`,
    outline: `bg-transparent ${colors.border} ${colors.text} hover:${colors.bg}`,
    ghost: `bg-transparent border-transparent ${colors.text} hover:${colors.bg}`
  }
  return variants[props.variant]
})

function handleClick(event: MouseEvent) {
  if (props.disabled) return
  
  if (props.href) {
    if (props.target === '_blank') {
      window.open(props.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = props.href
    }
  }
  
  emit('click', event)
}
</script>

<template>
  <button
    class="neon-button"
    :class="[
      sizeClasses,
      variantClasses,
      glowClasses.border,
      glowClasses.shadow,
      { 
        'flicker': flicker,
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled && !href,
        'cursor-pointer': href
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.neon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px;
  text-decoration: none;
  font-family: inherit;
  letter-spacing: 0.025em;
  overflow: hidden;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.neon-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px;
}

.neon-button:not(:disabled):hover::before {
  left: 100%;
}

.neon-button:not(:disabled):active {
  transform: translateY(0);
  box-shadow: 0 0 20px;
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* アイコンサポート */
.button-content :deep(.icon) {
  font-size: 1.2em;
}

/* リップルエフェクト */
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.neon-button:not(:disabled):active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 0.6s ease-out;
}
</style>