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
  <div class="font-handwritten-jp-casual neon-glow-purple text-2xl mb-2">CLI資産を活かせ !</div>
  <div>
    <span class="neon-glow-orange flicker text-7xl font-bold">Claude Code</span>
    <span class="font-handwritten-jp-casual neon-glow-pink-colored text-3xl">で整える</span>
  </div>
  <div class="font-handwritten-jp-cassual neon-glow-pink-colored text-4xl mt-6">アウトプットワークフロー</div>
</div>

<div class="font-handwritten-jp-casual neon-glow-matrix-colored flicker-slow text-5xl absolute bottom-25 left-170 transform -rotate-15">2025/09/08 Qiita Bash</div>

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
- `?` でショートカット表示
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
transition: slide-up
---

# CLIのメリット <v-click><span class="neon-glow-orange text-6xl">自由</span></v-click>

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
layout: two-cols-header
---

# 1. ペイン管理で画面をすっきり

<div class="mt-10">
</div>

::left::

## ペインとは?

ウィンドウ内の分割された領域のこと

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

### あわせて設定しておきたい通知設定

処理が終わったらパネルと音で通知

<div class="small-code" id="notification-code">

```json {all|2|3,14|9|9}
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

</div>

🔔 [terminal-notifier](https://github.com/julienXX/terminal-notifier)

<style>
/* コードブロックの横スクロール設定 */
#notification-code pre {
  overflow-x: auto;
  scroll-behavior: smooth;
}

/* commandの行が長いので、表示領域を広げる */
#notification-code {
  max-width: 100%;
}
</style>

<script setup>
import { onMounted, watch } from 'vue'

onMounted(() => {
  // 現在のスライドでクリック数を監視
  watch(() => $slidev?.nav?.clicks, (clicks) => {
    if (clicks === 4) { // 5番目のクリック（0ベースなので3）
      setTimeout(() => {
        const codeBlock = document.querySelector('#notification-code pre')
        if (codeBlock) {
          codeBlock.scrollLeft = 550
        }
      }, 100)
    }
  })
})
</script>

---
layout: two-cols
---

<br>

# 通知パネル消すために

# マウスを使いたくない

<br>

## <span class="neon-glow-purple">**Aliento**</span>で解決

<https://inchman.gumroad.com/l/Aliento>

::right::

<iframe
  src="https://inchman.gumroad.com/l/Aliento?embed=true"
  width="100%"
  height="500"
  frameborder="0"
  style="border-radius: 8px; border: 1px solid #333;">
</iframe>

---
layout: center
class: text-center
---

# CLIを使いこなせば<br/><span class="neon-glow-green text-5xl">認知負荷を下げられる</span>

---
layout: default
transition: view-transition
mdc: true
---

# せっかくならCLIの推し機能を<br/>Claude Codeで使いたい

<ul>
<li class="view-transition-jump">プロンプトごとにジャンプしてスクロール</li>
<li class="view-transition-edit">edit-command-line</li>
</ul>

<div class="mt-10 text-3xl text-red-400">
どちらも未対応😭
</div>

<div class="mt-6 opacity-70">

- [Issue #1465](https://github.com/anthropics/claude-code/issues/1465)
- [Issue #282](https://github.com/anthropics/claude-code/issues/282)

</div>

---
layout: center
transition: view-transition
mdc: true
---

# なら、設定すればいいじゃない

<ul class="text-2xl">
<li class="view-transition-jump">プロンプトごとにジャンプしてスクロール</li>
<li class="view-transition-edit">edit-command-line</li>
</ul>

---
transition: view-transition
layout: default
---

# プロンプトごとにジャンプしてスクロール {.inline-block.view-transition-jump}

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

- WezTerm の Lua API
  - pane:get_dimensions / pane:get_lines_as_text でビューポートの文字列取得
  - pane:split ペインを生成
  - pane:pane_id で CLI 送信先を特定

- WezTerm CLI
  - wezterm cli send-text でキーストロークや貼り付けを送信

いけるのでは?

---

# 再現できた

<div class="small-code" style="max-height: 80vh; overflow-y: auto;">

```lua
local wezterm = require("wezterm")

local module = {}

-- nvim で編集して Claude Code の入力欄へ送り込むアクションを定義
function module.edit_prompt()
  return {
    key = "A",
    mods = "CTRL",
    action = wezterm.action_callback(function(_, pane)
      -- 一時ファイルを作成
      local temp_base = os.tmpname()
      os.remove(temp_base)
      local temp_file = temp_base .. ".md"

      -- 取り出したテキストを保持する変数
      local current_text = ""

      -- ペインの寸法を取得して表示行数を得る
      local dims = pane:get_dimensions()
      local viewport_rows = dims and dims.viewport_rows or 0

      -- 画面に見えている範囲のテキストを取得
      local lines = ""
      if viewport_rows > 0 then
        lines = pane:get_lines_as_text(viewport_rows)
      end

      -- 行ごとに分割して配列化（空行も保持）
      local all_lines = {}
      for line in (lines .. "\n"):gmatch("(.-)\r?\n") do
        table.insert(all_lines, line)
      end

      -- 直近のボックスを検出（下から上へ探索）
      local prompt_lines = {}
      local box_end, box_start = 0, 0
      for i = #all_lines, 1, -1 do
        local l = all_lines[i]
        if l:match("^╰─") and box_end == 0 then
          box_end = i
        elseif l:match("^╭─") and box_end > 0 then
          box_start = i
          break
        end
      end

      -- 見つかったボックスの中身を抽出
      if box_start > 0 and box_end > box_start then
        for i = box_start + 1, box_end - 1 do
          local line = all_lines[i] or ""
          local clean = line

          -- NBSP を通常の空白へ置換
          clean = clean:gsub(string.char(194, 160), " ")

          -- 行頭と行末の罫線を個別に除去（UTF-8安全）
          clean = clean:gsub("^│%s*", ""):gsub("^┃%s*", ""):gsub("^|%s*", "")
          clean = clean:gsub("%s*│$", ""):gsub("%s*┃$", ""):gsub("%s*|$", "")

          -- 行頭に > があればその後ろを採用
          local after = clean:match("^%s*>%s*(.*)$")
          local out = after ~= nil and after or clean

          -- 空行もそのまま保持
          table.insert(prompt_lines, out)
        end
      end

      -- ボックスから取れたら結合 取れなければ空のまま
      if #prompt_lines > 0 then
        current_text = table.concat(prompt_lines, "\n")
      else
        current_text = ""
      end

      -- 整形せずにそのまま一時ファイルへ書き出し
      local file = io.open(temp_file, "wb")
      if file then
        file:write(current_text or "")
        file:close()
      end

      -- 下にペインを分割して nvim を起動 終了後に送信処理を実行
      pane:split({
        direction = "Bottom",
        size = 0.4,
        args = {
          "sh",
          "-c",
          string.format(
            [[
            # 変数を定義
            temp_file='%s'
            pane_id='%s'
            wezterm_cli="/Applications/WezTerm.app/Contents/MacOS/wezterm cli"

            # 一時ファイルを nvim で編集
            /opt/homebrew/bin/nvim "$temp_file"

            # 編集結果をチェック
            if [ -s "$temp_file" ]; then
              content=$(cat "$temp_file")
              if [ -n "$content" ]; then
                # クリップボードへ投入
                echo "$content" | pbcopy
                # 一時ファイルを削除
                rm -f "$temp_file"

                echo "✓ Sending prompt to Claude Code..."

                # 既存入力を Ctrl+L の生キー送信でクリア
                $wezterm_cli send-text --pane-id="$pane_id" --no-paste $'\x0c'
                sleep 0.05

                # bracketed paste で複数行を安定送信
                pbpaste | $wezterm_cli send-text --pane-id="$pane_id"

                echo "✓ Done!"
                sleep 0.5
              else
                echo "× No content to send"
                rm -f "$temp_file"
                sleep 2
              fi
            else
              echo "× File is empty"
              rm -f "$temp_file"
              sleep 2
            fi
          ]],
            temp_file,
            pane:pane_id()
          ),
        },
      })
    end),
  }
end

return module
```

</div>

---

# 設定はこちら

<div class="flex justify-center">
  <a href="https://github.com/mozumasu/dotfiles" target="_blank">
    <img src="https://opengraph.githubassets.com/1/mozumasu/dotfiles"
         alt="GitHub Repository"
         style="max-width: 90%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
  </a>
</div>

---
layout: center
class: text-center
---

# ご清聴ありがとうございました

<div class="mt-10 text-2xl opacity-70">
  <p>@mozumasu</p>
</div>

<div class="mt-10">
  <div class="text-xl neon-glow-cyan">
    CLIで快適なアウトプットライフを！
  </div>
</div>
