module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  plugins: [
    'vue',
    '@typescript-eslint',
  ],

  extends: [
    '@programic/eslint-config-vue3',
    '@programic/eslint-config-typescript',
  ],

  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      extends: ['@programic/eslint-config-base'],
    },
    {
      files: ['*.vue'],
      rules: { indent: 'off' },
    },
  ],
};
