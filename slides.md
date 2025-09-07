---
# try also 'default' to start simple
theme: ./slidev-theme-neon
colorSchema: light
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# apply any unocss classes to the current slide
class: "text-center"
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# transition: slide-left
title: CLI資産を活かせ! Claude Codeで整えるアウトプットワークフロー
mdc: true
---

<div class="text-center">
  <div class="text-2xl mb-2">CLI資産を活かせ</div>
  <div>
    <span class="neon-glow-orange flicker text-7xl font-bold">Claude Code</span>
    <span class="text-3xl">で整える</span>
  </div>
  <div class="text-3xl mt-6">アウトプットワークフロー</div>
</div>

by もずます

<div class="neon-glow-matrix-colored orange absolute bottom-25 left-200 transform -rotate-15">2024/09/09 Qiita Bash</div>

---
layout: default
---

# デフォルトサイズ適用例

## 見出しレベル2

これは通常のテキストです。個別にサイズクラスを指定せずに、テーマのデフォルトサイズが適用されています。

### 見出しレベル3

- リストアイテムもデフォルトサイズ
- 自動的に適切なサイズで表示
- クラス指定不要

**太字テキスト**や*イタリック*も同じサイズ設定を継承します。

---
layout: two-cols-header
---

# Neon Text Effects

::left::

## 白抜きバージョン（デフォルト）

<div class="neon-glow-cyan text-3xl font-light tracking-wide">Cyberpunk Style</div>
<div class="neon-glow-matrix text-6xl font-bold tracking-mega uppercase">MATRIX</div>
<div class="neon-glow-pink text-4xl">Pink Neon</div>
<div class="neon-glow-purple text-4xl font-semibold">Purple Glow</div>
<div class="neon-glow-yellow text-4xl tracking-widest">Yellow Shine</div>
<div class="neon-glow-orange text-4xl font-thin">Orange Flame</div>

::right::

## 色付きバージョン

<div class="neon-glow-matrix-colored text-6xl font-bold uppercase">MATRIX</div>
<div class="neon-glow-pink-colored text-4xl">Pink Colored</div>
<div class="neon-glow-purple-colored text-4xl">Purple Colored</div>
<div class="neon-glow-yellow-colored text-4xl">Yellow Colored</div>
<div class="neon-glow-orange-colored text-4xl">Orange Colored</div>

---

# Neonカード

<div class="grid grid-cols-2 gap-6">
  <NeonCard 
    title="Feature 1" 
    subtitle="Amazing Feature"
    icon="⚡"
    glow-color="cyan"
  >
    これはNeonカードコンポーネントです。
    グラスモーフィズムとネオングローを組み合わせています。
  </NeonCard>

  <NeonCard 
    title="Feature 2" 
    subtitle="Cool Feature"
    icon="🚀"
    glow-color="pink"
    :flicker="true"
  >
    点滅エフェクトも追加できます。
    ホバー時にさらに輝きます。
  </NeonCard>
</div>

---

# Neonボタン

<div class="flex gap-4 flex-wrap">
  <NeonButton glow-color="cyan" @click="console.log('Clicked!')">
    Click Me
  </NeonButton>
  
  <NeonButton glow-color="matrix" variant="outline">
    Outline
  </NeonButton>
  
  <NeonButton glow-color="purple" size="lg" :flicker="true">
    Large & Flicker
  </NeonButton>
  
  <NeonButton glow-color="orange" variant="ghost">
    Ghost Button
  </NeonButton>
</div>

<br>
<br>

### リンクボタン

<div class="flex gap-4">
  <NeonButton 
    href="https://github.com/slidevjs/slidev" 
    target="_blank"
    glow-color="yellow"
  >
    GitHub →
  </NeonButton>
  
  <NeonButton 
    href="https://sli.dev" 
    target="_blank"
    glow-color="pink"
    variant="outline"
  >
    Documentation
  </NeonButton>
</div>

---

# タイムライン

<NeonTimeline 
  :items="[
    {
      title: '2020年',
      subtitle: 'プログラミング開始',
      description: 'Web開発の世界に足を踏み入れる',
      icon: '🎯',
      date: '1月'
    },
    {
      title: '2021年',
      subtitle: 'フロントエンド専門',
      description: 'Vue.jsとReactを習得',
      icon: '💻',
      date: '6月'
    },
    {
      title: '2022年',
      subtitle: 'フルスタック開発',
      description: 'バックエンドも含めた開発を開始',
      icon: '🚀',
      date: '3月'
    },
    {
      title: '2023年',
      subtitle: 'CLI効率化の探求',
      description: 'NeovimとzshでDX向上',
      icon: '⚡',
      date: '9月'
    }
  ]"
  glow-color="matrix"
/>

---

# 点滅ネオンエフェクトデモ

## 点滅のみ（既存の色と組み合わせ）

<div class="neon-glow-orange flicker text-5xl mb-4">オレンジ色 + 点滅</div>
<div class="neon-glow-purple-colored flicker-fast text-4xl mb-4">パープル色付き + 高速点滅</div>
<div class="neon-glow-yellow flicker-slow text-4xl mb-6">イエロー色 + ゆっくり点滅</div>

## 色付き点滅（単独使用）

<div class="neon-flicker-matrix text-6xl font-bold uppercase tracking-mega mb-4">MATRIX</div>
<div class="neon-flicker-cyan text-5xl mb-4">シアン点滅</div>
<div class="neon-flicker-orange text-5xl">オレンジ点滅</div>

---
layout: default
---

# Table of contents

<Toc maxDepth="1"></Toc>

---

::code-group

```sh [npm]
npm i @slidev/cli
```

```sh [yarn]
yarn add @slidev/cli
```

```sh [pnpm]
pnpm add @slidev/cli
```

::

---
transition: slide-up
---

# Navigation

Hover on the bottom-left corner to see the navigation's control panel, [learn more](https://sli.dev/guide/navigation.html)

## Keyboard Shortcuts

|                                                    |                             |
| -------------------------------------------------- | --------------------------- |
| <kbd>right</kbd> / <kbd>space</kbd>                | next animation or slide     |
| <kbd>left</kbd> / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd>                                      | previous slide              |
| <kbd>down</kbd>                                    | next slide                  |

<p v-after class="absolute bottom-23 left-45 opacity-30 transform -rotate-10">Here!</p>

---
layout: image-right
image: <https://cover.sli.dev>
---

# Code

Use code snippets and get automatic highlighting, and even types hover![^1]

```ts {all|5|7|7-8|10|all} twoslash
// TwoSlash enables TypeScript hover information
// and errors in markdown code blocks
// More at https://shiki.style/packages/twoslash

import { computed, ref } from "vue";

const count = ref(0);
const doubled = computed(() => count.value * 2);

doubled.value = 2;
```

<arrow v-click="[4, 5]" x1="350" y1="310" x2="195" y2="334" color="#953" width="2" arrowSize="1" />

<!-- This allow you to embed external code blocks -->
<!-- <<< @/snippets/external.ts#snippet -->

<!-- Footer -->

[^1]: [Learn More](https://sli.dev/guide/syntax.html#line-highlighting)

<!-- Inline style -->
<style>
.footnotes-sep {
  @apply mt-5 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---

# Components

<div grid="~ cols-2 gap-4">
<div>

You can use Vue components directly inside your slides.

We have provided a few built-in components like `<Tweet/>` and `<Youtube/>` that you can use directly. Adding your own custom components is also super easy.

```html
<Counter :count="10" />
```

<!-- ./components/Counter.vue -->
<Counter :count="10" m="t-4" />

Check out [the guides](https://sli.dev/builtin/components.html) for more.

</div>
<div>

```html
<Tweet id="1390115482657726468" />
```

<Tweet id="1390115482657726468" scale="0.65" />

</div>
</div>
