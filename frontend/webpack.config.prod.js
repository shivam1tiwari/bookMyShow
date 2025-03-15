const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');



module.exports = {
  entry: './src/index.tsx', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.jsx'], // Resolve these extension
  },
   plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve('/public/index.html') }),
    new CompressionWebpackPlugin({
      test: /\.(js|css|html)$/,  
      algorithm: 'gzip',        
      threshold: 10240,          
      minRatio: 0.8,             
    }),

    // Brotli Compression Plugin
    new BrotliPlugin({
      asset: '[path].br',         
      test: /\.(js|css|html)$/,   
      threshold: 10240,              
      minRatio: 0.8,                 
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(
     {
      extractComments: false
     }
    )],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    open: true,
  },
  mode: 'production',
  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
};