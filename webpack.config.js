import path from 'node:path';
import url from 'node:url';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  entry: './source/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
