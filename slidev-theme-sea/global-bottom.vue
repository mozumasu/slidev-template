<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import OceanBackground from "./components/OceanBackground.vue";
import ThemeIndicator from "./components/ThemeIndicator.vue";

// コンポーネント参照
const oceanRef =
  useTemplateRef<InstanceType<typeof OceanBackground>>("oceanRef");

// 現在のテーマバリアントを取得
const getCurrentWaveTheme = () => oceanRef.value?.currentWaveTheme;

// W キーは setup/shortcuts.ts が CustomEvent として発火する
const handleSwitchTheme = () => {
  oceanRef.value?.switchWaveTheme();
};

onMounted(() => {
  window.addEventListener("switch-wave-theme", handleSwitchTheme);
});

onUnmounted(() => {
  window.removeEventListener("switch-wave-theme", handleSwitchTheme);
});
</script>

<template>
  <!-- 海の背景 -->
  <OceanBackground ref="oceanRef" :visible="true" />

  <!-- テーマインジケーター -->
  <ThemeIndicator current-theme="ocean" :wave-theme="getCurrentWaveTheme()" />
</template>
