import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
}
export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"), //по default назва бандла main.js
    //   entry: {
    //     точка входа, прописан шлях до файлу, який є головним
    //     bundle: path.resolve(__dirname, "src", "index.js"),
    //     statistics: path.resolve(__dirname, "src", "statistics.js"),
    //   },
    output: {
      path: path.resolve(__dirname, "build"), //папка з файлами для production, назва по default - dist
      filename: "bundle_[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      port: 5000,
      open: true,
    },
  };
  return config;
};