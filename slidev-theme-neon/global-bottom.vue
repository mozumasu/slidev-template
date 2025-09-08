<script setup lang="ts">
import { ref, onMounted } from "vue";
import NeonBackground from "./components/NeonBackground.vue";
import ThemeIndicator from "./components/ThemeIndicator.vue";

// テーマプロパティ
const props = defineProps<{
  theme?: "synthwave" | "neon";
}>();

// 状態
const currentTheme = ref(props.theme || "synthwave");
const currentSlideNo = ref(1);

// コンポーネント参照
const neonRef = ref<InstanceType<typeof NeonBackground>>();

// 現在のNeonテーマを取得
const getCurrentNeonTheme = () => neonRef.value?.currentNeonTheme;

onMounted(() => {
  // URLに基づいてスライド番号を更新
  const updateSlideNumber = () => {
    const path = window.location.pathname;
    const match = path.match(/\/(\d+)$/);
    if (match) {
      currentSlideNo.value = parseInt(match[1]);
    } else {
      currentSlideNo.value = 1;
    }
  };

  // 初期更新
  updateSlideNumber();

  // popstateイベント（ナビゲーション）をリッスン
  window.addEventListener("popstate", updateSlideNumber);

  // キーボードショートカットをリッスン
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "w" || event.key === "W") {
      if (neonRef.value) {
        neonRef.value.switchNeonTheme();
      }
    }
  };
  window.addEventListener("keydown", handleKeyPress);

  // 定期的に変更をチェック（フォールバック）
  const interval = setInterval(updateSlideNumber, 500);

  // クリーンアップ
  return () => {
    window.removeEventListener("popstate", updateSlideNumber);
    window.removeEventListener("keydown", handleKeyPress);
    clearInterval(interval);
  };
});
</script>

<template>
  <!-- Neonの背景 -->
  <NeonBackground 
    ref="neonRef" 
    :visible="true" 
    :slide-number="currentSlideNo"
  />

  <!-- テーマインジケーター -->
  <ThemeIndicator
    :current-theme="currentTheme"
    :neon-theme="getCurrentNeonTheme()"
    @switch-theme="() => neonRef?.switchNeonTheme()"
  />
</template>