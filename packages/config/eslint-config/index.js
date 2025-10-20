module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // not needed in React 17+
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/order': ['warn', { 'newlines-between': 'always' }],
    'react/prop-types': 'off',
  },
};
