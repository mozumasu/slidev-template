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
layout: center
---

<SelfIntroduction theme="neon" profileImage="/profile_mozumasu.jpeg" />

---
layout: center
---

# Claude Codeを選ぶ理由 <span class="neon-glow-green text-5xl">4選</span>

---
layout: default
---

# 1. 便利機能が一通りある

<div class="grid grid-cols-2 gap-x-4" style="grid-template-columns: auto 1fr;">
  <div class="flex items-baseline">
    <span class="font-bold">スラッシュコマンド</span>
  </div>
  <div class="text-gray-400 pl-4">
    スニペットみたいなやつ
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">サブエージェント</span>
  </div>
  <div class="text-gray-400 pl-4">
    メインとは別にコンテキストを与えられる
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">MCPとの連携</span>
  </div>
  <div class="text-gray-400 pl-4">
    外部ツールとの統合
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">resume/continue機能</span>
  </div>
  <div class="text-gray-400 pl-4">
    セッション復帰
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">planモード</span> <span class="text-sm opacity-70 ml-2">(shift + tab)</span>
  </div>
  <div class="text-gray-400 pl-4">
    方針を決めてから編集できる
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">/compactと/clear</span>
  </div>
  <div class="text-gray-400 pl-4">
    コンテキスト管理
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">hooks</span>
  </div>
  <div class="text-gray-400 pl-4">
    イベントに応じて指示したりコマンド実行
  </div>
  
  <div class="flex items-baseline">
    <span class="font-bold">ESC-ESC</span>
  </div>
  <div class="text-gray-400 pl-4">
    任意の会話の位置に戻る
  </div>
</div>

---
layout: two-cols-header
---

# CLIツールらしい機能

::left::

## 便利ショートカットキー

- ドキュメント: [Interactive Mode](https://docs.anthropic.com/ja/docs/claude-code/interactive-mode)
- `?` を入力すると追加のショートカットが表示される
  - **undo** - 直前の操作を取り消し
  - **suspend** - セッションを一時停止

::right::

<div class="bg-gray-900 rounded-lg p-4 border border-gray-700">

### 主なショートカットキー

<div class="text-sm font-mono">

- `Ctrl+C` - キャンセル
- `Ctrl+D` - 終了
- `Ctrl+L` - 画面クリア
- `Tab` - オートコンプリート
- `↑/↓` - 履歴
- `?` - ヘルプ表示

</div>

</div>

---
layout: default
---

# 2. プロンプトのベストプラクティスが<br/>既に公式ドキュメントにある

<div class="text-2xl">

[Claude 4プロンプトエンジニアリングのベストプラクティス - Anthropic](https://docs.anthropic.com/ja/docs/build-with-claude/prompt-engineering/claude-4-best-practices)

</div>

<div class="mt-2">
  <img src="/claude-best-practices.png" class="rounded-lg shadow-xl border border-gray-700" />
</div>

---
layout: default
---

# 3. <span class="text-xs text-gray-400">比較的 </span>dotfilesで設定を管理できる

```sh
# 設定ファイルのパスを指定

export CLAUDE_CONFIG_DIR=${XDG_CONFIG_HOME}/claude
```

<div class="mt-8 text-xl opacity-70">

⚠️ **注意**: MCPの設定は`~/.claude/settings.json`に追加されるため厳しい

</div>

---
layout: center
class: text-center
---

# 4. CLIで動く

<div class="text-6xl mt-10 neon-glow-purple">
🖥️
</div>

---
layout: center
class: text-center
---

# CLIのメリット: <span class="neon-glow-orange text-6xl">自由</span>

<div class="text-xl mt-10">
<v-click>?🤔</v-click>
</div>

---
layout: center
---

# - <ruby>WezTerm<rt>ターミナル</rt></ruby>も<ruby>Neovim<rt>エディタ</rt></ruby>もLuaで設定できる

<br>

# - コマンドの知識が活かせる

---
layout: center
class: text-center
---

# 設定例を紹介

<div class="text-5xl mt-10 neon-glow-cyan">
⚙️ ✨
</div>

---
layout: default
---

# 1. ペイン管理で画面をすっきり

---
layout: two-cols-header
---

# ペインって何?

::left::

## ペイン

ウィンドウ内の分割された領域

::right::

<div class="border-2 border-gray-600 rounded-lg p-4 bg-gray-900">
  <div class="text-center mb-2 text-sm opacity-60">ターミナルウィンドウ</div>
  <div class="grid grid-cols-2 gap-2">
    <div class="border border-cyan-400 rounded p-4 bg-gray-800">
      <div class="text-cyan-400 text-sm mb-2">ペイン1</div>
      <div class="text-xs opacity-60">エディタ</div>
    </div>
    <div class="border border-green-400 rounded p-4 bg-gray-800">
      <div class="text-green-400 text-sm mb-2">ペイン2</div>
      <div class="text-xs opacity-60">Claude Code</div>
    </div>
    <div class="border border-purple-400 rounded p-4 bg-gray-800 col-span-2">
      <div class="text-purple-400 text-sm mb-2">ペイン3</div>
      <div class="text-xs opacity-60">ターミナル</div>
    </div>
  </div>
</div>

---
layout: default
---

# 1. ペイン管理で画面をすっきり

- **必要なときだけ**Claudeのペインを表示
- Claude Codeのペインを**Zoom**（最大化）
- Neovimで開いて**見返す**

<div class="mt-10 opacity-70">
💡 画面の切り替えがスムーズに！
</div>

---
layout: default
---

# 2. 複数のプロジェクト管理も楽々

## WezTermのworkspaceで切り替え

- 参考: [WezTermのworkspace機能](https://zenn.dev/sankantsu/articles/e713d52825dbbb)
- タブのカスタマイズも可能
- プロジェクトごとに独立した環境

---
layout: default
---

# あわせて設定しておきたい通知設定

処理が終わったらパネルと音で通知

```json {all|7-8|all}
// ~/.config/claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title \"Claude\" -message \"$(basename \"$PWD\")\" & \nafplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title \"Claude Notification\" -message \"$(basename \"$PWD\")\" & \nafplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ]
  }
}
```

🔔 [terminal-notifier](https://github.com/julienXX/terminal-notifier)

---
layout: default
---

# あわせて設定しておきたい通知設定

## 通知パネル消すためにマウスを使いたくない

→ **Aliento**で解決

[Aliento - Notification Manager](https://inchman.gumroad.com/l/Aliento)

<div class="mt-10 opacity-70">
キーボードだけで通知を管理！
</div>

---
layout: center
class: text-center
---

# CLIを使いこなせば<br/><span class="neon-glow-green text-5xl">認知負荷を下げられる</span>

---
layout: default
---

# せっかくならCLIの推し機能を<br/>Claude Codeで使いたい

- プロンプトごとにジャンプしてスクロール
- edit-command-line

<div class="mt-10 text-3xl text-red-400">
どちらも未対応😭
</div>

<div class="mt-6 opacity-70">

- [Issue #1465](https://github.com/anthropics/claude-code/issues/1465)
- [Issue #282](https://github.com/anthropics/claude-code/issues/282)

</div>

---
layout: default
---

# プロンプトごとにジャンプしてスクロール

Hooksに仕込むがうまくいかず...

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "printf '\\033]133;B\\033\\\\'"
          }
        ]
      }
    ]
  }
}
```

---
layout: default
---

# edit-command-line

wezterm cliで実現できそう

<div class="mt-10 opacity-70">
🚧 開発中...
</div>

---
