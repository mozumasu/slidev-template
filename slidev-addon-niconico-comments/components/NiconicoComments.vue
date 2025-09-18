<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

interface Comment {
  id: number
  text: string
  color?: string
  size?: 'small' | 'medium' | 'large'
  position?: 'top' | 'middle' | 'bottom'
  duration?: number
}

interface CommentElement extends Comment {
  lane: number
  startTime: number
}

const props = defineProps<{
  comments?: Comment[]
  enabled?: boolean
  speed?: number
  maxLanes?: number
  slideNumber?: number
}>()

const commentElements = ref<CommentElement[]>([])
const nextCommentId = ref(1000)
const animationFrame = ref<number>()
const containerRef = ref<HTMLDivElement>()
const laneTiming = ref<number[]>([])

const speed = computed(() => props.speed || 5000)
const maxLanes = computed(() => props.maxLanes || 10)
const isEnabled = computed(() => props.enabled !== false)

const clearAllComments = () => {
  commentElements.value = []
  laneTiming.value = Array(maxLanes.value).fill(0)
}

const loadPresetComments = () => {
  if (!props.comments) {
    console.log('No comments to load')
    return
  }
  
  console.log('Loading preset comments:', props.comments.length, 'comments')
  props.comments.forEach((comment, index) => {
    setTimeout(() => {
      console.log('Adding comment:', comment.text)
      addComment(comment.text, comment.color, comment.size, comment.position, comment.duration)
    }, index * 1000)
  })
}

watch(() => props.slideNumber, (newSlide) => {
  console.log('Slide changed to:', newSlide, 'Comments:', props.comments)
  clearAllComments()
  if (props.comments && isEnabled.value) {
    loadPresetComments()
  }
})

watch(() => props.enabled, (newVal) => {
  console.log('Enabled changed to:', newVal)
  if (!newVal) {
    clearAllComments()
  } else if (props.comments) {
    loadPresetComments()
  }
})

watch(() => props.comments, (newComments) => {
  console.log('Comments prop changed:', newComments)
  if (newComments && isEnabled.value) {
    clearAllComments()
    loadPresetComments()
  }
}, { immediate: true })

const findAvailableLane = (position?: string): number => {
  const now = Date.now()
  const startLane = position === 'top' ? 0 : position === 'bottom' ? Math.floor(maxLanes.value * 0.7) : Math.floor(maxLanes.value * 0.3)
  const endLane = position === 'top' ? Math.floor(maxLanes.value * 0.3) : position === 'bottom' ? maxLanes.value : Math.floor(maxLanes.value * 0.7)
  
  let bestLane = startLane
  let earliestTime = laneTiming.value[startLane] || 0
  
  for (let i = startLane; i < endLane; i++) {
    if (!laneTiming.value[i] || laneTiming.value[i] < now) {
      return i
    }
    if (laneTiming.value[i] < earliestTime) {
      earliestTime = laneTiming.value[i]
      bestLane = i
    }
  }
  
  return bestLane
}

const addComment = (text: string, color?: string, size?: string, position?: string, duration?: number) => {
  if (!isEnabled.value) return
  
  const lane = findAvailableLane(position)
  const commentDuration = duration || speed.value
  
  const newComment: CommentElement = {
    id: nextCommentId.value++,
    text,
    color: color || '#ffffff',
    size: size as 'small' | 'medium' | 'large' || 'medium',
    position: position as 'top' | 'middle' | 'bottom' || 'middle',
    duration: commentDuration,
    lane,
    startTime: Date.now()
  }
  
  commentElements.value.push(newComment)
  laneTiming.value[lane] = Date.now() + commentDuration * 0.3
  
  setTimeout(() => {
    removeComment(newComment.id)
  }, commentDuration + 1000)
}

const removeComment = (id: number) => {
  const index = commentElements.value.findIndex(c => c.id === id)
  if (index !== -1) {
    commentElements.value.splice(index, 1)
  }
}

const handleKeyPress = (e: KeyboardEvent) => {
  // C キーでコメント入力（global-bottom.vueと重複しないように削除）
  // global-bottom.vueで統一的に処理
}

onMounted(() => {
  console.log('NiconicoComments mounted. Enabled:', isEnabled.value, 'Comments:', props.comments)
  if (isEnabled.value && props.comments) {
    loadPresetComments()
  }
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})

defineExpose({
  addComment,
  clearAllComments
})
</script>

<template>
  <div v-if="isEnabled" ref="containerRef" class="niconico-comments-container">
    <div
      v-for="comment in commentElements"
      :key="comment.id"
      class="niconico-comment"
      :class="[`size-${comment.size}`, `lane-${comment.lane}`]"
      :style="{
        '--comment-color': comment.color,
        '--comment-duration': `${comment.duration}ms`,
        '--lane-position': `${comment.lane * (100 / maxLanes)}%`
      }"
    >
      {{ comment.text }}
    </div>
  </div>
</template>

<style scoped>
.niconico-comments-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
}

.niconico-comment {
  position: absolute;
  white-space: nowrap;
  color: var(--comment-color, #ffffff);
  font-weight: bold;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 3px #000;
  animation: flow-comment var(--comment-duration, 5000ms) linear forwards;
  transform: translateY(var(--lane-position));
  font-family: 'MS PGothic', 'Hiragino Kaku Gothic Pro', sans-serif;
}

.niconico-comment.size-small {
  font-size: 1.2rem;
}

.niconico-comment.size-medium {
  font-size: 1.6rem;
}

.niconico-comment.size-large {
  font-size: 2rem;
}

@keyframes flow-comment {
  from {
    transform: translateX(100vw) translateY(var(--lane-position));
  }
  to {
    transform: translateX(-100%) translateY(var(--lane-position));
  }
}
</style>