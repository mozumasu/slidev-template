# slidev-template

[Slidev](https://sli.dev) 製のスライドと、自作テーマ・アドオンをまとめた pnpm workspace です。

## 構成

| パス | 内容 |
| --- | --- |
| `slides.md` | スライド本体（テーマ: `./slidev-theme-neon`） |
| `slidev-theme-neon/` | ネオン風テーマ（`w` キーでバリエーション切替） |
| `slidev-theme-sea/` | 海（Three.js の水面）テーマ |
| `slidev-addon-niconico-comments/` | ニコニコ動画風コメントを流すアドオン |
| `docs/github-pages-setup.md` | GitHub Pages デプロイ手順 |

## 使い方

```sh
pnpm install
pnpm dev      # 開発サーバーを起動してブラウザで開く
pnpm build    # dist/ に静的ビルド
pnpm export   # PDF エクスポート
```

main ブランチへの push で `.github/workflows/deploy.yml` が GitHub Pages へ自動デプロイします。

## テーマ開発メモ

テーマの作り方・lint / formatter の設定メモは [docs/theme-development.md](docs/theme-development.md) を参照してください。
