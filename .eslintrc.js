// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'next/core-web-vitals'],
  plugins: ['prettier', '@typescript-eslint', 'unused-imports'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
