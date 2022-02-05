module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['eslint-plugin-prettier'],
  globals: {
    wx: true,
    $: true,
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'no-console': 'off',
    'vue/no-mutating-props': 'off',
  },
}
