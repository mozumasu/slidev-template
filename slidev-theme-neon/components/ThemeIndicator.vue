<script setup lang="ts">
import { computed } from "vue";
import type { NeonTheme } from "../composables/useNeonThemes";

// プロパティ
const props = defineProps<{
  currentTheme: "neon";
  neonTheme?: NeonTheme;
}>();

// イベントの発行
const emit = defineEmits<{
  switchTheme: [];
}>();

// 算出プロパティ
const themeIcon = computed(() => "✨");
const themeVariant = computed(() => {
  if (props.neonTheme) {
    return props.neonTheme.toUpperCase();
  }
  return "";
});

const hintText = computed(() => {
  return "Press W for neon style";
});
</script>

<template>
  <div class="theme-indicator">
    <div
      class="theme-badge neon"
      @click="$emit('switchTheme')"
    >
      {{ themeIcon }}
      {{ currentTheme.toUpperCase() }}
      <span v-if="themeVariant" class="theme-variant"> ({{ themeVariant }}) </span>
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