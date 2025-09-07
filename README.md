# slidev-theme

## 環境構築

```sh
pnpm add -D @slidev/cli
# テーマのsetupで使用
pnpm add -D @slidev/types
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

---

## スライドテーマの作成

ジェネレーターの使用してテーマを作成する

```sh
pnpm create slidev-theme slidev-theme-sea
```

> [!NOTE]
> テーマは以下の規約に従う必要があります：
> パッケージ名はslidev-theme-で始める必要があります。
> 例として、slidev-theme-nameまたは@scope/slidev-theme- nameのような形式が適切です。
> package.json ファイルの keywords フィールドに "slidev-theme" と "slidev" を追加してください。
> ref: [Writing Themes | Slidev](https://sli.dev/guide/write-theme)

```sh
# 作成したテーマのディレクトリへ移動
cd !$

# 起動してテーマの内容を確認
pnpm run dev
```

自分のスライドに設定できるか確認する
テーマを公開していない場合は直接ディレクトリを指定する

```sh
---
theme: ./slidev-theme-sea
---
```
