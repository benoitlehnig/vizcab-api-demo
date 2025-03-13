module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        tabWidth: 2,
        printWidth: 100,
        trailingComma: 'es5',
      },
    ],
  },
}
