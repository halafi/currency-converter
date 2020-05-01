module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/no-unresolved': ['error', { commonjs: false }],
    // fix unused type imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // disable check for import .ts extension
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  settings: {
    // for root index import resolution
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
};
