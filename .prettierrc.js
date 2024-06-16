module.exports = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: [
    "^react(.*)$",
    "^(.*)react(.*)$",
    "^(.*)expo(.*)$",
    "^(.*)tamagui(.*)$",
    "^[./]",
    "<THIRD_PARTY_MODULES>",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
