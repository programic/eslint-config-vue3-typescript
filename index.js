/* eslint-disable no-var, object-shorthand */
var typescriptOverride = require('@programic/eslint-config-typescript/typescript-override');

var parser = 'vue-eslint-parser';
var parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  parser: '@typescript-eslint/parser',
  extraFileExtensions: ['.vue'],
  project: './tsconfig.json',
};

module.exports = {
  parser: parser,

  parserOptions: parserOptions,

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  plugins: [
    'vue',
    '@typescript-eslint',
  ],

  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      extends: ['@programic/eslint-config-base'],
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      parser: parser,
      parserOptions: parserOptions,
      extends: [
        '@programic/eslint-config-vue3',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: Object.assign(typescriptOverride.rules, {
        indent: 'off',
        'unicorn/prevent-abbreviations': ['error', {
          checkShorthandProperties: true,
          checkProperties: true,
          ignore: [
            /^src$/i,
            // Vue specific ignores
            /attrs|params|prop|props|ref|refs/i,
          ],
        }],
      }),
    },
  ],
};
