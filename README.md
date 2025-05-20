# Clockmaker Labs

このプロジェクトは [Angular 19](https://angular.io/) で構築されています。

## 開発サーバーの起動

```sh
npm start
```

`http://localhost:4200/` でアプリが自動リロードされます。

## ビルド

```sh
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力されます。
本番用ビルドは `--configuration production` オプション付きで実行されます。

## コード整形・リント

- コード整形（Prettier）:  
  ```sh
  npm run format
  ```
- TypeScript/HTMLリント（ESLint）:  
  ```sh
  npm run lint
  ```
- SCSSリント（Stylelint）:  
  ```sh
  npm run stylelint
  ```

## 依存技術

- Angular 19
- TypeScript 5.8
- RxJS, Zone.js
- ESLint, Stylelint, Prettier
- howler.js, shuffle-text など

## 注意

- ユニットテスト・E2Eテストは本リポジトリでは利用していません。

## さらなる情報

- [Angular公式ドキュメント](https://angular.jp/)
- [Angular CLI README](https://github.com/angular/angular-cli/blob/main/README.md)
