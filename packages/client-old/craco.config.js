const path = require("path");
const absolutePath = path.join(__dirname, "../vision-ui");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: absolutePath,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      });
      return webpackConfig;
    },
  },
};
