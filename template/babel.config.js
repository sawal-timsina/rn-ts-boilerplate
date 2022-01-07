module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "~/src": "./src",
          "~/config": "./config.ts",
          "~/locale": "./locale",
          "~/assets": "./assets",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
