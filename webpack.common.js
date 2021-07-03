const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/images/**'], // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
          },
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        imageminPngquant({
          quality: 50,
        }),
      ],
    }),
    new WebpackPwaManifest({
      name: 'Restaurant Catalogue Lite',
      short_name: 'Restaurant Lite',
      description: 'Free Catalogue Restaurant for you',
      background_color: '#ffffff',
      theme_color: '#667d90',
      display: 'standalone',
      start_url: '/index.html',
      filename: 'manifest.json',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/public/cafe-resto.png'),
          sizes: [120, 152, 167, 180],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('src/public/cafe-resto.png'),
          size: 512,
          destination: path.join('icons', 'ios'),
          ios: 'startup',
        },
        {
          src: path.resolve('src/public/cafe-resto.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('icons', 'android'),
          purpose: 'maskable',
        },
      ],
    }),
  ],
};
