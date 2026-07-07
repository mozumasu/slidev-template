<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { configs, useNav } from '@slidev/client'
import NiconicoComments from './components/NiconicoComments.vue'
import type { CommentsData, NiconicoConfig } from './types'

const { currentPage } = useNav()

// headmatter の niconico: を設定として読む
const niconicoConfig = computed<NiconicoConfig>(
  () => (configs as { niconico?: NiconicoConfig }).niconico ?? {},
)

const commentsData = ref<CommentsData>({})
const commentsRef = useTemplateRef<InstanceType<typeof NiconicoComments>>('commentsRef')
const isEnabled = ref(true)

const currentComments = computed(() => commentsData.value[currentPage.value] ?? [])

const toggleComments = () => {
  isEnabled.value = !isEnabled.value
}

const loadCommentsData = async () => {
  const source = niconicoConfig.value.comments
  if (!source) return

  if (typeof source !== 'string') {
    commentsData.value = source
    return
  }

  // 先頭が "/" のパスは base path (GitHub Pages 等) 配下でも解決できるようにする
  const url = source.startsWith('/')
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${source}`
    : source

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    commentsData.value = await response.json()
  } catch (error) {
    console.warn(`[niconico-comments] Failed to load comments from "${url}":`, error)
    commentsData.value = {}
  }
}

const handleToggleEvent = () => {
  toggleComments()
}

const handleAddManualCommentEvent = () => {
  const text = prompt('コメントを入力してください:')
  if (text) {
    commentsRef.value?.addComment(text)
  }
}

onMounted(() => {
  loadCommentsData()
  window.addEventListener('toggle-niconico-comments', handleToggleEvent)
  window.addEventListener('add-manual-comment', handleAddManualCommentEvent)
})

onUnmounted(() => {
  window.removeEventListener('toggle-niconico-comments', handleToggleEvent)
  window.removeEventListener('add-manual-comment', handleAddManualCommentEvent)
})
</script>

<template>
  <NiconicoComments
    ref="commentsRef"
    :comments="currentComments"
    :enabled="isEnabled && niconicoConfig.enabled !== false"
    :speed="niconicoConfig.speed"
    :max-lanes="niconicoConfig.maxLanes"
    :slide-number="currentPage"
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
