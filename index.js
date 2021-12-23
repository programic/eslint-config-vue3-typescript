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

  rules: {
    'unicorn/prevent-abbreviations': ['error', {
      checkShorthandProperties: true,
      checkProperties: true,
      ignore: [
        /^src$/i,
        // Vue specific ignores
        /attrs|params|prop|props|ref|refs/i,
      ],
    }],
  },
};
