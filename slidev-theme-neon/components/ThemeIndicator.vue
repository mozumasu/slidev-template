<script setup lang="ts">
import { computed } from "vue";
import type { NeonTheme } from "../composables/useNeonThemes";

// プロパティ
const props = defineProps<{
  currentTheme: "synthwave" | "neon";
  neonTheme?: NeonTheme;
}>();

// イベントの発行
const emit = defineEmits<{
  switchTheme: [];
}>();

// 算出プロパティ
const themeIcon = computed(() => "✨");

// 現在のテーマ名を取得
const displayThemeName = computed(() => {
  // neonThemeが指定されていればそれを使用、なければsynthwave
  const theme = props.neonTheme || 'synthwave';
  return theme.toUpperCase();
});

const hintText = computed(() => {
  return "Press W to switch theme";
});
</script>

<template>
  <div class="theme-indicator">
    <div
      :class="['theme-badge', neonTheme || 'synthwave']"
      @click="$emit('switchTheme')"
    >
      {{ themeIcon }} {{ displayThemeName }}
    </div>
    <div class="theme-hint">{{ hintText }}</div>
  </div>
</template>

<style scoped>
.theme-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.theme-badge {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  user-select: none;
}

.theme-badge.neon {
  background: rgba(139, 92, 246, 0.8);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

.theme-badge.synthwave {
  background: linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%);
  box-shadow: 0 0 20px rgba(255, 0, 110, 0.7);
}

.theme-badge.cyberpunk {
  background: linear-gradient(135deg, #ff0080 0%, #00ff88 100%);
  box-shadow: 0 0 20px rgba(255, 0, 128, 0.6);
}

.theme-badge.default {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
}

.theme-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px currentColor;
}

.theme-hint {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.theme-variant {
  font-size: 0.9em;
  opacity: 0.8;
  margin-left: 4px;
}
</style>