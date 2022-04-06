import path from "path";

import NodemonPlugin from "nodemon-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  target: "node",
  entry: ["./src/index.ts"],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js",
  },
  plugins: [new NodemonPlugin()],
};

export default config;
