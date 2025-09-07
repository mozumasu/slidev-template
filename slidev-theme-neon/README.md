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
