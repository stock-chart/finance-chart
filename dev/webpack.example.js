const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = require('./webpack.development');

module.exports = (env) => {
  const base = devConfig(env);
  delete base.entry;
  delete base.externals;
  const config = webpackMerge.smart(
    base,
    {
      mode: 'production',
      context: path.resolve(__dirname, '..'),
      entry: {
        index: './example/scripts/index'
      },
      output: {
        path: path.resolve(__dirname, '../example-dist/'),
        filename: 'example.js'
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  configFile: 'tsconfig.example.json'
                }
              },
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../example/index.html')
        })
      ]
    }
  );
  return config;
};