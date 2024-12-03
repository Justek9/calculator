const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development', 
    entry: './src/index.js', 
    output: {
      filename: 'bundle.js', 
      path: path.resolve(__dirname, 'dist'), 
    },
    devtool: isProduction ? false : 'source-map', 
    devServer: {
      static: path.join(__dirname, 'dist'), 
      compress: true, 
      port: 3000, 
      open: true, 
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', 
        filename: 'index.html', 
      }),
    ],
    module: {
      rules: [
        
        {
          test: /\.js$/, 
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/, 
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
