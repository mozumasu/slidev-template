---
# try also 'default' to start simple
theme: ./slidev-theme-neon
colorSchema: dark
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
  <div class="font-handwritten-jp-casual text-2xl mb-2">CLI資産を活かせ !</div>
  <div>
    <span class="neon-glow-orange flicker text-7xl font-bold">Claude Code</span>
    <span class="font-handwritten-jp-casual text-3xl">で整える</span>
  </div>
  <div class="font-handwritten-jp-cassual text-4xl mt-6">アウトプットワークフロー</div>
</div>

<p class="opacity-35">もずます</p>

<div class="font-handwritten-jp-casual text-green-400 text-5xl opacity-85 absolute bottom-25 left-170 transform -rotate-15">2024/09/09 Qiita Bash</div>

---
layout: default
---

# Table of contents

<Toc maxDepth="1"></Toc>

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

<div class="neon-glow-orange-colored text-3xl font-light tracking-wide">Cyberpunk Style</div>

::right::

## 色付きバージョン

<div class="neon-glow-matrix-colored text-6xl font-bold uppercase">MATRIX</div>
<div class="neon-glow-pink-colored text-4xl">Pink Colored</div>
<div class="neon-glow-purple-colored text-4xl">Purple Colored</div>
<div class="neon-glow-yellow-colored text-4xl">Yellow Colored</div>
<div class="neon-glow-orange-colored text-4xl">Orange Colored</div>

---
layout: default
---

# 点滅ネオンエフェクトデモ

<div class="neon-glow-orange flicker text-5xl mb-4">オレンジ色 + 点滅</div>
<div class="neon-glow-purple-colored flicker-fast text-4xl mb-4">パープル色付き + 高速点滅</div>
<div class="neon-glow-yellow flicker-slow text-4xl mb-6">イエロー色 + ゆっくり点滅</div>

---
layout: two-cols-header
---

# 手書き風フォントデモ

::left::

## 日本語対応の手書きフォント

<div class="font-handwritten-jp text-3xl mb-3">教科書体風 (Klee One)</div>
<div class="font-handwritten-jp-casual text-3xl mb-3">よもぎフォント</div>
<div class="font-handwritten-jp-pop text-3xl mb-3">はちまるポップ</div>
<div class="font-handwritten-jp-rock text-3xl mb-3">ロックンロール</div>
<div class="font-handwritten-jp-reggae text-3xl mb-3">レゲエワン</div>
<div class="font-handwritten-jp-syuku text-3xl mb-3">佑字 - 肅</div>
<div class="font-handwritten-jp-mai text-3xl mb-3">佑字 - 舞</div>

::right::

## 日本語ネオン手書き

<div class="neon-handwritten-jp-green text-3xl mb-3">緑のネオン手書き</div>
<div class="neon-handwritten-jp-cyan text-3xl mb-3">シアンの教科書体</div>
<div class="neon-handwritten-jp-orange text-3xl mb-3">オレンジロック</div>
<div class="neon-handwritten-jp-pink text-3xl mb-3">ピンクのポップ</div>
<div class="neon-handwritten-jp-purple flicker text-3xl">点滅するよもぎ</div>

---

# Code - 通常サイズ

```sh
pnpm install -g @slidev/cli
```

<br>

## Code Group

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

# Code - 小さいサイズ

<div class="small-code">

長いコード用：

```sh
pnpm install -g @slidev/cli && slidev init my-presentation --theme neon && cd my-presentation && pnpm install
```

</div>

<style>
/* このスライドのコードを小さくする */
.small-code pre.slidev-code code {
  font-size: 1.0rem !important;
}
</style>

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
    href="<https://sli.dev>"
    target="_blank"
    glow-color="pink"
    variant="outline" >
    Documentation
  </NeonButton>
</div>

---
transition: slide-up
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

# Navigation

Hover on the bottom-left corner to see the navigation's control panel, [learn more](https://sli.dev/guide/navigation.html)

## Keyboard Shortcuts

|                                                    |                             |
| -------------------------------------------------- | --------------------------- |
| <kbd>right</kbd> / <kbd>space</kbd>                | next animation or slide     |
| <kbd>left</kbd> / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd>                                      | previous slide              |
| <kbd>down</kbd>                                    | next slide                  |

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
