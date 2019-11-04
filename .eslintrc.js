
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    worker: true,
    mocha: true,
    phantomjs: true,
    serviceworker: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/no-v-html': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },

  globals: {
    'wx': true,
  },

   // add your custom rules here
   rules: {
    'no-new': 'off',
    'vue/no-v-html': 'off'
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};

