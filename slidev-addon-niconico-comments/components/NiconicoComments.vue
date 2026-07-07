<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import type { Comment, CommentPosition, CommentSize } from '../types'

interface CommentElement extends Comment {
  id: number
  lane: number
}

const {
  comments,
  enabled,
  speed = 5000,
  maxLanes = 10,
  slideNumber,
} = defineProps<{
  comments?: Comment[]
  enabled?: boolean
  speed?: number
  maxLanes?: number
  slideNumber?: number
}>()

const commentElements = ref<CommentElement[]>([])
const nextCommentId = ref(1000)
const laneTiming = ref<number[]>([])
const timers = new Set<ReturnType<typeof setTimeout>>()

const isEnabled = computed(() => enabled !== false)

const schedule = (fn: () => void, delay: number) => {
  const timer = setTimeout(() => {
    timers.delete(timer)
    fn()
  }, delay)
  timers.add(timer)
}

const clearTimers = () => {
  timers.forEach((timer) => clearTimeout(timer))
  timers.clear()
}

const clearAllComments = () => {
  clearTimers()
  commentElements.value = []
  laneTiming.value = Array(maxLanes).fill(0)
}

const loadPresetComments = () => {
  if (!comments) {
    return
  }

  comments.forEach((comment, index) => {
    schedule(() => {
      addComment(comment.text, comment.color, comment.size, comment.position, comment.duration)
    }, index * 1000)
  })
}

watch(
  [() => slideNumber, () => comments],
  () => {
    clearAllComments()
    if (comments && isEnabled.value) {
      loadPresetComments()
    }
  },
  { immediate: true },
)

watch(
  () => enabled,
  (newVal) => {
    if (!newVal) {
      clearAllComments()
    } else if (comments) {
      loadPresetComments()
    }
  },
)

const findAvailableLane = (position?: CommentPosition): number => {
  const now = Date.now()
  const startLane = position === 'top' ? 0 : position === 'bottom' ? Math.floor(maxLanes * 0.7) : Math.floor(maxLanes * 0.3)
  const endLane = position === 'top' ? Math.floor(maxLanes * 0.3) : position === 'bottom' ? maxLanes : Math.floor(maxLanes * 0.7)

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

const addComment = (
  text: string,
  color?: string,
  size?: CommentSize,
  position?: CommentPosition,
  duration?: number,
) => {
  if (!isEnabled.value) return

  const lane = findAvailableLane(position)
  const commentDuration = duration || speed

  const newComment: CommentElement = {
    id: nextCommentId.value++,
    text,
    color: color || '#ffffff',
    size: size || 'medium',
    position: position || 'middle',
    duration: commentDuration,
    lane,
  }

  commentElements.value.push(newComment)
  laneTiming.value[lane] = Date.now() + commentDuration * 0.3

  schedule(() => {
    removeComment(newComment.id)
  }, commentDuration + 1000)
}

const removeComment = (id: number) => {
  const index = commentElements.value.findIndex((c) => c.id === id)
  if (index !== -1) {
    commentElements.value.splice(index, 1)
  }
}

onUnmounted(() => {
  clearTimers()
})

defineExpose({
  addComment,
  clearAllComments,
})
</script>

<template>
  <div v-if="isEnabled" class="niconico-comments-container">
    <div
      v-for="comment in commentElements"
      :key="comment.id"
      class="niconico-comment"
      :class="`size-${comment.size}`"
      :style="{
        '--comment-color': comment.color,
        '--comment-duration': `${comment.duration}ms`,
        top: `${comment.lane * (100 / maxLanes)}%`,
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
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
