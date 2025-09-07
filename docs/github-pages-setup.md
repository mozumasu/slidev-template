# GitHub Pages セットアップガイド

このプレゼンテーションをGitHub Pagesで公開する手順です。

## 1. GitHub Actionsを有効化

1. GitHubリポジトリの `Settings` タブを開く
2. 左メニューから `Pages` を選択
3. `Build and deployment` セクションで:
   - Source: `GitHub Actions` を選択

## 2. ワークフローの実行

### 自動デプロイ
- `main` または `master` ブランチへのpush時に自動的にデプロイされます

### 手動デプロイ
1. リポジトリの `Actions` タブを開く
2. 左メニューから `Deploy to GitHub Pages` を選択
3. `Run workflow` ボタンをクリック
4. ブランチを選択して `Run workflow` を実行

## 3. デプロイ状況の確認

1. `Actions` タブでワークフローの実行状況を確認
2. 成功すると、以下のURLでアクセス可能:
   ```
   https://<username>.github.io/<repository-name>/
   ```

例: `https://mozumasu.github.io/slidev-template/`

## 4. トラブルシューティング

### ページが表示されない場合
- `Settings` > `Pages` で GitHub Actions が選択されているか確認
- ワークフローが正常に完了しているか確認
- ブラウザのキャッシュをクリアして再読み込み

### ビルドエラーが発生する場合
- `pnpm-lock.yaml` がコミットされているか確認
- Node.js のバージョン互換性を確認

## 技術詳細

### ワークフローファイル
`.github/workflows/deploy.yml` で以下の処理を実行:

1. Node.js LTS版のセットアップ
2. pnpm のセットアップとキャッシュ
3. 依存関係のインストール
4. Slidevのビルド（ベースパスを自動設定）
5. GitHub Pagesへのデプロイ

### ベースパス設定
GitHub Pagesでは、サブディレクトリでホスティングされるため、ビルド時に自動的にリポジトリ名をベースパスとして設定しています。

```bash
pnpm build --base /<repository-name>/
```