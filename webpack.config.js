const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  node: { global: false },
  mode: "production",
  entry: {
    index: "./index.js",
  },
  output: {
    publicPath: "./out/",
    path: path.resolve(__dirname, "out"),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        chunkFilter: (chunk) => {
          // Exclude mapsjs chunk from the minification as it is already minified
          if (/mapsjs/.test(chunk.name)) return false;
          return true;
        },
      }),
    ],
  },
};
