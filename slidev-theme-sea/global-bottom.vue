<script setup lang="ts">
import { ref, onMounted } from "vue";
import OceanBackground from "./components/OceanBackground.vue";
import ThemeIndicator from "./components/ThemeIndicator.vue";

// テーマプロパティ
const props = defineProps<{
  theme?: "ocean";
}>();

// 状態
const currentTheme = ref(props.theme || "ocean");
const currentSlideNo = ref(1);

// コンポーネント参照
const oceanRef = ref<InstanceType<typeof OceanBackground>>();

// テーマ切り替え関数（現在は海テーマのみ）
const toggleTheme = () => {
  // 現在は海テーマのみ使用可能
  console.log("Background theme:", currentTheme.value);
};

// 現在のテーマバリアントを取得
const getCurrentWaveTheme = () => oceanRef.value?.currentWaveTheme;

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
    if (event.key === "t" || event.key === "T") {
      toggleTheme();
    } else if (event.key === "w" || event.key === "W") {
      if (currentTheme.value === "ocean" && oceanRef.value) {
        oceanRef.value.switchWaveTheme();
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
  <!-- 海の背景 -->
  <OceanBackground ref="oceanRef" :visible="true" />

  <!-- テーマインジケーター -->
  <ThemeIndicator
    :current-theme="currentTheme"
    :wave-theme="getCurrentWaveTheme()"
    @toggle-theme="toggleTheme"
  />
</template>
