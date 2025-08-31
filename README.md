# slidev-theme

## 環境構築

```sh
pnpm add -D @slidev/cli
```

## スライドの追加

```sh
slidev slides.md
```

## 動作確認

デフォルトテーマで試してみる

```sh
pnpm add -D @slidev/theme-default
```

```sh
pnpm run dev
```

---

## markdownlintの設定

フォーマットによりfrontMatterなどのレイアウトが崩れるため 、以下のルールを無効化する

- MD033/no-inline-html : Inline HTML : <https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md033.md>
- MD025/single-title/single-h1 : Multiple top-level headings in the same document : <https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md025.md>
- MD003/heading-style : Heading style : <https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md003.md>
- MD022/blanks-around-headings : Headings should be surrounded by blank lines : <https://github.com/DavidAnson/markdownlint/blob/v0.35.0/doc/md022.md>

## フォーマッターの設定

これが

```text
---
transition: fade-out
---
```

このようにフォーマットされてしまわないようにprettierの設定をする

```text
---
## transition: fade-out
```

```sh
pnpm i -D prettier prettier-plugin-slidev
```

設定ファイルを追加する

```json:/.prettierrc
{
  "overrides": [
    {
      "files": ["slides.md", "pages/*.md"],
      "options": {
        "parser": "slidev",
        "plugins": ["prettier-plugin-slidev"]
      }
    }
  ]
}
```

> ref: [Prettier Plugin | Slidev](https://sli.dev/features/prettier-plugin)
