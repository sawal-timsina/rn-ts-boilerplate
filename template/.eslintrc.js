module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: [2, "double"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-console": 1,
  },
};
