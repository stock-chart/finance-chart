const path = require('path');

module.exports = env => {
  return {
    context: path.resolve(__dirname, '../src/'),
    entry: {
      'finance-chart': './index'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      library: 'FinanceChart',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ]
        },
      ]
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    }
  };
};
