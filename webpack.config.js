const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // the path to your static files
    },
    compress: true, // enable gzip compression
    port: 8080, // the port that the server should listen on
    open: true, // open the default browser when the server starts
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // path to your index.html template file
      filename: 'index.html', // output file name
      // add any other options you need
      favicon: 'src/resources/icon.png',
      clean: true,
    },
    )
  ]

};