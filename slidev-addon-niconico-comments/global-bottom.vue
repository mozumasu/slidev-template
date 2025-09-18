<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import NiconicoComments from './components/NiconicoComments.vue'

const props = defineProps<{
  niconico?: {
    enabled?: boolean
    speed?: number
    maxLanes?: number
    comments?: any
  }
}>()

const currentSlideNo = ref(1)
const commentsData = ref<Record<number, any[]>>({})
const commentsRef = ref<InstanceType<typeof NiconicoComments>>()
const isEnabled = ref(true)

// Slidevのfrontmatterから設定を取得
const niconicoConfig = computed(() => {
  // @ts-ignore
  const globalConfig = window?.__slidev__?.configs?.niconico || {}
  const config = Object.keys(globalConfig).length > 0 ? globalConfig : props.niconico || {}
  console.log('Getting niconico config from:', { global: globalConfig, props: props.niconico, final: config })
  return config
})
const currentComments = computed(() => commentsData.value[currentSlideNo.value] || [])

const toggleComments = () => {
  isEnabled.value = !isEnabled.value
}

const loadCommentsData = async () => {
  console.log('loadCommentsData called, config:', niconicoConfig.value)
  if (niconicoConfig.value.comments) {
    try {
      if (typeof niconicoConfig.value.comments === 'string') {
        console.log('Loading comments from URL:', niconicoConfig.value.comments)
        const response = await fetch(niconicoConfig.value.comments)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        commentsData.value = data
        console.log('Comments loaded successfully:', data)
      } else {
        commentsData.value = niconicoConfig.value.comments
        console.log('Comments set from config:', niconicoConfig.value.comments)
      }
    } catch (error) {
      console.error('Failed to load comments:', error)
      commentsData.value = {}
    }
  } else {
    console.log('No comments configured')
  }
}

const addManualComment = (text: string, options?: any) => {
  if (commentsRef.value) {
    commentsRef.value.addComment(text, options?.color, options?.size, options?.position)
  }
}

onMounted(() => {
  const updateSlideNumber = () => {
    const path = window.location.pathname
    const match = path.match(/\/(\d+)$/)
    if (match) {
      currentSlideNo.value = parseInt(match[1])
    } else {
      currentSlideNo.value = 1
    }
    console.log('Current slide:', currentSlideNo.value, 'Comments for slide:', commentsData.value[currentSlideNo.value])
  }

  updateSlideNumber()
  loadCommentsData()

  window.addEventListener('popstate', updateSlideNumber)
  
  const handleKeyPress = (event: KeyboardEvent) => {
    // W キーでコメント表示切替
    if (event.key === 'w' || event.key === 'W') {
      toggleComments()
    } 
    // C キーでコメント入力
    else if (event.key === 'c' || event.key === 'C') {
      const text = prompt('コメントを入力してください:')
      if (text) {
        addManualComment(text)
      }
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)

  const interval = setInterval(updateSlideNumber, 500)

  return () => {
    window.removeEventListener('popstate', updateSlideNumber)
    window.removeEventListener('keydown', handleKeyPress)
    clearInterval(interval)
  }
})

defineExpose({
  addManualComment,
  toggleComments
})
</script>

<template>
  <NiconicoComments
    ref="commentsRef"
    :comments="currentComments"
    :enabled="isEnabled && niconicoConfig.enabled !== false"
    :speed="niconicoConfig.speed"
    :max-lanes="niconicoConfig.maxLanes"
    :slide-number="currentSlideNo"
  />
  
  <div v-if="niconicoConfig.enabled !== false" class="niconico-controls">
    <button @click="toggleComments" class="toggle-button">
      {{ isEnabled ? '🔊' : '🔇' }}
    </button>
    <div class="control-hint">
      <span>W: コメント表示切替</span>
      <span>C: コメント入力</span>
    </div>
  </div>
</template>

<style scoped>
.niconico-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.toggle-button {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 2px solid #0099ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button:hover {
  background: rgba(0, 153, 255, 0.3);
  transform: scale(1.1);
}

.control-hint {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.control-hint:hover {
  opacity: 1;
}

.control-hint span {
  white-space: nowrap;
}
</style>