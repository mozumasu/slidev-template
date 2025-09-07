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

- `neon-flicker` - 汎用点滅エフェクト（currentColor使用）
- `neon-flicker-cyan` - シアン色の点滅
- `neon-flicker-matrix` - Matrix風グリーンの点滅
- `neon-flicker-fast` - 高速点滅（0.8秒）
- `neon-flicker-slow` - ゆっくり点滅（3秒）

### テキストユーティリティ

- **サイズ**: `text-xs` ~ `text-9xl`
- **太さ**: `font-thin` ~ `font-black`
- **文字間隔**: `tracking-tighter` ~ `tracking-mega`
- **変換**: `uppercase`, `lowercase`, `capitalize`

### 使用例

```html
<div class="neon-glow-cyan text-4xl font-bold">白抜きネオン</div>
<div class="neon-glow-matrix-colored text-6xl uppercase">色付きネオン</div>
<div class="neon-flicker-cyan text-5xl">点滅するネオン</div>
<div class="neon-glow-purple neon-flicker-fast text-4xl">高速点滅</div>
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
