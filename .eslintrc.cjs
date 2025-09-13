/** Vue + TS + 型対応ルール（Type-Checked） */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  // Vue SFC をパース
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],   // ← 型情報を読む
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // TS + 型対応ルール（推奨 + 厳しめ + コードスタイル）
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    // Prettier と競合する書式ルールを無効化
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    // お好みで
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
}