module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  rules: {},
}
