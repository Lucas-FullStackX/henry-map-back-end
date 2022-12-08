module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jsdoc'],
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:jsdoc/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    indent: 'off',
    semi: [2, 'always'],
    'no-undef': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
  },
  linebreakStyle: 0,
  ignorePatterns: ['migrations/*'],
};
