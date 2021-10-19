const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack")
const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname + "/dist")
  },
  // loaders
  module: {
    rules: [
      {
        // looking for image files with extension of .jpg
        test: /\.jpg$/i,
        // loader is implemented
        use: [
          {
            loader: 'file-loader',
            options: {
              // format correctly
              esModule: false,
              name (file) {
                // returns name of file with extension
                return "[path][name].[ext]"
              },
              publicPath: function(url) {
                // replaces ../ to /assets/
                return url.replace("../", "/assets/")
              }
            }
          },
          {
            // this minimizes the size of the images in the carouselSlides
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  // plugins
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    })
  ],
  mode: "development"
};