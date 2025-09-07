<template>
  <div class="slidev-layout default">
    <slot />
  </div>
</template>

<style scoped>
/* デフォルトレイアウトのベーススタイル */
.default {
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  line-height: 1.75;
}
</style>
