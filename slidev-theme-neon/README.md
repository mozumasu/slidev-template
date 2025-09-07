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

### テキストユーティリティ
- **サイズ**: `text-xs` ~ `text-9xl`
- **太さ**: `font-thin` ~ `font-black`
- **文字間隔**: `tracking-tighter` ~ `tracking-mega`
- **変換**: `uppercase`, `lowercase`, `capitalize`

### 使用例
```html
<div class="neon-glow-cyan text-4xl font-bold">白抜きネオン</div>
<div class="neon-glow-matrix-colored text-6xl uppercase">色付きネオン</div>
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
