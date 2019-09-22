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
    output: {
      // Needed for code splitting to work in nested paths
      publicPath: "/"
    },
  },
  // {
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       title: "Webpack demo",
  //     }),
  //   ],
  // },
  parts.loadJavascript({ include: PATHS.app }),
  parts.setFreeVariable("HELLO", "hello from config")
]);

const productionConfig = merge([
  {
    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000, // in bytes
    },
  },
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
    recordsPath: path.join(__dirname, "records.json"),
  },
  // parts.clean(PATHS.build),
  parts.minifyJavascript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations
      safe: true,
    },
  }),
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
      name: "[name].[hash:4].[ext]"
    }
  }),
  {
    optimization: {
      splitChunks: {
        // default
        chunks: "initial",
        // // explicit
        // cacheGroups: {
        //   commons: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name: "vendor",
        //     chunks: "initial"
        //   },
        // },
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  parts.attachRevision()
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

// module.exports = mode => {
//   // pass mode into babel configuration
//   process.env.BABEL_ENV = mode;

//   if (mode === 'production') {
//     return merge(commonConfig, productionConfig, { mode });
//   }

//   return merge(commonConfig, developmentConfig, { mode });
// };

module.exports = mode => {
  const pages = [
    parts.page({
      title: "Webpack demo",
      entry: {
        app: PATHS.app,
      },
      chunks: ["app", "manifest", "vendors~app"],
    }),
    parts.page({
      title: "Another demo",
      path: "another",
      entry: {
        another: path.join(PATHS.app, "another.js"),
      },
      chunks: ["another", "manifest", "vendors~app"],
    }),
  ];

  const config = mode === "production" ? productionConfig : developmentConfig;

  const configs = merge([commonConfig, config, { mode }].concat(pages));
  
  console.log(configs)
  return configs;
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