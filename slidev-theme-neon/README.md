# slidev-theme-neon

A Neon theme for Slidev with animated polygon backgrounds.

## Features

- ✨ **3つのNeonバリエーション**:
  - Default: 紫・青・マゼンタの組み合わせ
  - Cyberpunk: マゼンタ・シアン・イエローの鮮やかな配色
  - Synthwave: ピンク・パープル・ブルーのレトロな雰囲気

- 🎨 **動的なポリゴンアニメーション**: スライドごとに変化する幾何学的パターン
- 🌈 **色相回転エフェクト**: 時間とともに変化する色彩
- ⌨️ **キーボードショートカット**: Wキーでテーマバリエーション切り替え

## Installation

Add the following to your `package.json`:

```json
{
  "devDependencies": {
    "slidev-theme-neon": "file:./slidev-theme-neon"
  }
}
```

Then run:

```bash
npm install
# or
pnpm install
```

## Usage

In your slides markdown file:

```yaml
---
theme: neon
---
```

## Default Font Sizes

テーマにはデフォルトのフォントサイズが設定されています：

- **基本テキスト**: 1.125rem (18px)
- **H1見出し**: text-5xl (3rem) - カバー/イントロレイアウトでは text-6xl
- **H2見出し**: text-3xl (1.875rem) - カバー/イントロレイアウトでは text-4xl
- **H3見出し**: text-2xl (1.5rem)
- **段落 (p)**: text-xl (1.25rem)
- **リスト項目**: text-lg (1.125rem)

### カスタマイズ方法

スライドごとにデフォルトサイズを上書きする場合：

```html
<style scoped>
  h1 {
    @apply text-7xl;
  }
  p {
    @apply text-2xl;
  }
</style>
```

## Text Effects

### ネオンエフェクト（白抜き）

- `neon-glow-cyan` - シアンのネオングロー
- `neon-glow-matrix` - Matrix風グリーングロー
- `neon-glow-pink` - ピンクネオングロー
- `neon-glow-purple` - パープルネオングロー
- `neon-glow-yellow` - イエローネオングロー
- `neon-glow-orange` - オレンジネオングロー

### ネオンエフェクト（色付き）

- `neon-glow-[color]-colored` - 各色の色付きバージョン

### 点滅エフェクト（アニメーション）

#### 点滅のみ（既存の色と組み合わせて使用）
- `flicker` - 通常速度の点滅（2秒）
- `flicker-fast` - 高速点滅（0.8秒）
- `flicker-slow` - ゆっくり点滅（3秒）

#### 色付き点滅エフェクト（単独使用）
- `neon-flicker` - 汎用点滅エフェクト（currentColor使用）
- `neon-flicker-cyan` - シアン色の点滅
- `neon-flicker-matrix` - Matrix風グリーンの点滅
- `neon-flicker-orange` - オレンジ色の点滅
- `neon-flicker-pink` - ピンク色の点滅
- `neon-flicker-purple` - パープル色の点滅
- `neon-flicker-yellow` - イエロー色の点滅

### テキストユーティリティ

- **サイズ**: `text-xs` ~ `text-9xl`
- **太さ**: `font-thin` ~ `font-black`
- **文字間隔**: `tracking-tighter` ~ `tracking-mega`
- **変換**: `uppercase`, `lowercase`, `capitalize`

### 使用例

```html
<!-- 基本的なネオンエフェクト -->
<div class="neon-glow-cyan text-4xl font-bold">白抜きネオン</div>
<div class="neon-glow-matrix-colored text-6xl uppercase">色付きネオン</div>

<!-- 点滅のみ（既存の色と組み合わせ） -->
<div class="neon-glow-orange flicker text-5xl">オレンジ色で点滅</div>
<div class="neon-glow-purple-colored flicker-fast text-4xl">高速点滅</div>

<!-- 色付き点滅（単独使用） -->
<div class="neon-flicker-cyan text-5xl">シアン点滅</div>
<div class="neon-flicker-orange text-6xl">オレンジ点滅</div>
```

## カスタムコンポーネント

### NeonCodeBlock
ネオンスタイルのコードブロック表示

```html
<NeonCodeBlock 
  :code="`your code here`"
  lang="javascript"
  title="タイトル"
  glow-color="cyan"
/>
```

### NeonProfile
自己紹介スライド用コンポーネント

```html
<NeonProfile
  name="名前"
  title="役職"
  bio="自己紹介文"
  :skills="['スキル1', 'スキル2']"
  :social="[
    { platform: 'github', url: 'https://github.com/username' }
  ]"
  glow-color="purple"
/>
```

### NeonCard
汎用カードコンポーネント

```html
<NeonCard 
  title="タイトル" 
  subtitle="サブタイトル"
  icon="⚡"
  glow-color="cyan"
  :flicker="true"
>
  カードの内容
</NeonCard>
```

### NeonButton
インタラクティブボタン

```html
<NeonButton 
  glow-color="cyan"
  variant="solid|outline|ghost"
  size="sm|md|lg"
  :flicker="true"
  @click="handleClick"
>
  ボタンテキスト
</NeonButton>
```

### NeonTimeline
タイムライン表示

```html
<NeonTimeline 
  :items="[
    {
      title: 'タイトル',
      subtitle: 'サブタイトル',
      description: '説明',
      icon: '🎯',
      date: '日付'
    }
  ]"
  glow-color="matrix"
  orientation="vertical|horizontal"
/>
```

## Keyboard Shortcuts

- `W`: Switch between Neon themes (default → cyberpunk → synthwave)

## Theme Variants

### Default

紫・青・マゼンタのクラシックなNeonカラー

### Cyberpunk

鮮やかなマゼンタ・シアン・イエローのサイバーパンク風

### Synthwave

80年代風のピンク・パープル・ブルー

## License

MIT
