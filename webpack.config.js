/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack'); // Добавлено для использования IgnorePlugin

module.exports = {
  entry: "./src/server.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("stream-http"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "vm": require.resolve("vm-browserify"), // Добавлено
      "assert": require.resolve("assert/"), // Добавлено
      "async_hooks": false, // Установлено как false, если не используется
      "net": false, // Установлено как false, если не используется
    }
  },
};
