module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  semi: true,
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 100,
  importOrder: [
    '^(express|react|next)(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^(../)+(.*)$',
    '^(./)(.*)$',
    '^(.*).(css|scss|sass)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
