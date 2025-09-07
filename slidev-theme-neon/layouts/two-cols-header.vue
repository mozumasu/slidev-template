<template>
  <div class="slidev-layout two-cols-header">
    <div class="header-section">
      <slot name="default" />
    </div>
    <div class="content-grid">
      <div class="column-left">
        <slot name="left" />
      </div>
      <div class="column-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-cols-header {
  min-height: 100vh;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
}

/* ヘッダーセクション - タイトル部分 */
.header-section {
  margin-bottom: 1.5rem; /* タイトル下の余白を最小限に */
}

.header-section :deep(h1) {
  @apply text-5xl font-bold mb-2;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
}

.header-section :deep(h2) {
  @apply text-3xl font-semibold mb-2;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
}

/* コンテンツグリッド - 2カラム部分 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  flex: 1;
  align-items: start; /* コンテンツを上部に配置 */
}

.column-left,
.column-right {
  width: 100%;
}

/* 各カラム内の見出しスタイル */
.column-left :deep(h2),
.column-right :deep(h2) {
  @apply text-2xl font-semibold mb-3;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
}

.column-left :deep(h3),
.column-right :deep(h3) {
  @apply text-xl font-medium mb-2;
  color: #ffffff;
}

/* レスポンシブ対応（必要に応じて） */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>