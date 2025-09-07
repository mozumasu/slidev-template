<template>
  <div class="slidev-layout center">
    <div class="center-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.center-content {
  text-align: center;
  width: 100%;
  max-width: 1200px;
  font-size: 1.25rem;
  line-height: 1.75;
}

/* 見出しのスタイル */
.center-content :deep(h1) {
  @apply text-5xl font-bold mb-4;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
}

.center-content :deep(h2) {
  @apply text-3xl font-semibold mb-3;
  color: #ffffff;
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
}

.center-content :deep(h3) {
  @apply text-2xl font-medium mb-2;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
}

/* ネオンエフェクトクラス */
.center-content :deep(.neon-glow-green) {
  color: #00ff00;
  text-shadow: 
    0 0 10px rgba(0, 255, 0, 0.8),
    0 0 20px rgba(0, 255, 0, 0.6),
    0 0 30px rgba(0, 255, 0, 0.4);
}

.center-content :deep(.neon-glow-orange) {
  color: #ff8800;
  text-shadow: 
    0 0 10px rgba(255, 136, 0, 0.8),
    0 0 20px rgba(255, 136, 0, 0.6),
    0 0 30px rgba(255, 136, 0, 0.4);
}

.center-content :deep(.neon-glow-cyan) {
  color: #00ffff;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.8),
    0 0 20px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.4);
}

.center-content :deep(.neon-glow-purple) {
  color: #ff00ff;
  text-shadow: 
    0 0 10px rgba(255, 0, 255, 0.8),
    0 0 20px rgba(255, 0, 255, 0.6),
    0 0 30px rgba(255, 0, 255, 0.4);
}

/* リストスタイル */
.center-content :deep(ul),
.center-content :deep(ol) {
  text-align: left;
  display: inline-block;
  margin: 1rem auto;
}

.center-content :deep(li) {
  margin: 0.5rem 0;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .center-content {
    font-size: 1.125rem;
  }
  
  .center-content :deep(h1) {
    @apply text-4xl;
  }
  
  .center-content :deep(h2) {
    @apply text-2xl;
  }
}
</style>