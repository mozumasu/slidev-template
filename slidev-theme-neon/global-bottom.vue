<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import { useNav } from "@slidev/client";
import NeonBackground from "./components/NeonBackground.vue";
import ThemeIndicator from "./components/ThemeIndicator.vue";

const { currentPage } = useNav();

// コンポーネント参照
const neonRef = useTemplateRef<InstanceType<typeof NeonBackground>>("neonRef");

// 現在のNeonテーマを取得
const getCurrentNeonTheme = () => neonRef.value?.currentNeonTheme;

// W キーは setup/shortcuts.ts が CustomEvent として発火する
const handleSwitchTheme = () => {
  neonRef.value?.switchNeonTheme();
};

onMounted(() => {
  window.addEventListener("switch-neon-theme", handleSwitchTheme);
});

onUnmounted(() => {
  window.removeEventListener("switch-neon-theme", handleSwitchTheme);
});
</script>

<template>
  <!-- Neonの背景 -->
  <NeonBackground
    ref="neonRef"
    :visible="true"
    :slide-number="currentPage"
  />

  <!-- テーマインジケーター -->
  <ThemeIndicator
    :neon-theme="getCurrentNeonTheme()"
    @switch-theme="() => neonRef?.switchNeonTheme()"
  />
</template>
