const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
};
