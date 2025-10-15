# slidev-addon-niconico-comments

ニコニコ動画風のコメントを流すSlidevアドオンです。

## 機能

- 画面上を右から左へ流れるコメント表示
- スライドごとのプリセットコメント
- リアルタイムコメント入力
- カスタマイズ可能な表示設定

## インストール

### ローカルでの使用

```yaml
---
addons:
  - ./slidev-addon-niconico-comments
---
```

### npmパッケージとして（将来的に公開後）

```bash
npm install slidev-addon-niconico-comments
```

## 使い方

### 基本設定

`slides.md`のfrontmatterに以下を追加：

```yaml
---
addons:
  - slidev-addon-niconico-comments
niconico:
  enabled: true
  speed: 5000
  maxLanes: 10
  comments: "./comments.json"
---
```

### 設定オプション

| オプション | デフォルト  | 説明                           |
| ---------- | ----------- | ------------------------------ |
| `enabled`  | `true`      | コメント機能の有効/無効        |
| `speed`    | `5000`      | コメントが流れる速度（ミリ秒） |
| `maxLanes` | `10`        | 同時表示可能なレーン数         |
| `comments` | `undefined` | コメントデータファイルへのパス |

### キーボードショートカット

- **W**: コメント表示のON/OFF切り替え
- **C**: 手動でコメントを入力

### コメントデータ形式

`comments.json`の例：

```json
{
  "1": [
    {
      "text": "コメント内容",
      "color": "#ff0000",
      "size": "large",
      "position": "middle"
    }
  ],
  "2": [
    {
      "text": "別のコメント",
      "color": "#00ff00"
    }
  ]
}
```

各コメントオプション：

- `text`: コメントの内容（必須）
- `color`: 文字色（オプション、デフォルト: #ffffff）
- `size`: 文字サイズ - small/medium/large（オプション、デフォルト: medium）
- `position`: 表示位置 - top/middle/bottom（オプション、デフォルト: middle）
- `duration`: 表示時間（オプション、デフォルト: speedの値）

## 開発

### テスト実行

```bash
cd slidev-addon-niconico-comments
pnpm dev
```

## ライセンス

MIT

