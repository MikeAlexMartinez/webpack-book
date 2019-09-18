const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
  parts.loadJavascript({ include: PATHS.app }),
]);

const productionConfig = merge([
  // source-map is the slowest and highest quality option of them all.
  parts.generateSourceMaps({ type: "source-map" }),
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  // CSS extraction needs to happen before purification
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  // inline small images, but fallback to file-loader when
  // limit exceeded
  parts.loadImages({
    options: {
      limit: 5000,
      name: "[name].[ext]"
    }
  }),
  {
    optimization: {
      splitChunks: {
        // default
        // chunks: "initial"

        // explicit
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial"
          },
        },
      },
    },
  },
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST, // defaults to `localhost`
    port: process.env.PORT, // Default to 8080
  }),
  // only inline css during development
  parts.loadCSS(),
  // inline images during development
  parts.loadImages(),
]);

module.exports = mode => {
  // pass mode into babel configuration
  process.env.BABEL_ENV = mode;

  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};

// Traditional webpack config
// module.exports = {
  
//   devServer: {
//     // contentBase: my/index/html/lives/here.html
//     // proxy: if required
//     // headers: // attach customer headers here.

//     // Display only errors to reduce the amount of output.
//     stats: "errors-only",

//     // Parse host and port from env to allow customization
//     //
//     // If you use Docker, Vagrant or Cloud9, set
//     // host: "0.0.0.0"
//     // 
//     // 0.0.0.0 is available to all network devices
//     // unlike default `localhost`.
//     host: process.env.HOST, // defaults to `localhost`
//     port: process.env.PORT, // Default to 8080
//     open: true, // Open the page in the browser,
//     overlay: true, // Enables error overlay

//     // Watch options - if file watching used by WDS isn't sufficient
//     // watchOptions: {
//     //   // Delay buildup after the first change
//     //   aggregateTimeout: 300,

//     //   // Poll using interval (in ms, acccepts boolean too)
//     //   poll: 1000,
//     // }
//   },
  
//   // configures plugins to use.
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "Webpack demo",
//     }),
//   ],
// };