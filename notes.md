
Survive JS - Webpack

Webpack begins it's work from entries. After which it begins it's traversal process.
During which it will assess matches against loader configurations, that tell webpack
how to transform each match.

Entry             ->  Webpack  ->  Output
app/component.js      Plugins      Split point
app/helper.js         Loaders

Resolution Process

Webpack enconunters a module and matches against the entry's resolve config.
You can tell webpack to perform the lookup against specific directories. If webpack
can resolve a file correctly, it performs processing over the matched file based
on the loader definition.

Loaders can be matched in multiple ways also.

To resolve, webpack use the ['enhanced-resolve'](https://github.com/webpack/enhanced-resolve) package underneath.

Webpack resolves each module it encounters while constructing the dependency graph. If 
an entry contains dependencies, the process will be performed recursively. It can 
perform this process against any file type.

It can be used for CSS and or images and other file types. Emitting or creating assets 
as defined.

Webpack evaluates matched loaders from bottom to top and right to left.

Plugins allow you to intercept runtime events at different stages of the bundling 
process.

Webpack treats all code as Javascript by default. Plugins are able to prevent this.
e.g. MiniCssExtractPlugin.

After every module has been evaluated webpack writes the output. This includes a 
manifest script that includes instructions on how to execute in the browser.

-> Asset Hashing

Hashes can be injected into each bundle name to invalidate bundles (and caches) on the 
client side as changes are made.

-> Hot Module Replacement

Allows browser to automatically detect changes during development process for quick 
visual verification of any changes that have been made.

-> Code Splitting

In addition to HMR, webpacks bundling capabilities are extensive.


# Section 1 - Developing

It's advised to install webpack and webpack-cli locally to a project.

HtmlWebpackPlugin injects a html page into your project.

It can be extended with a range of plugins (see page 11)

## webpack-dev-server

You can ue webpack in it's watch mode e.g. npm run build -- --watch

WDS is a dev server running in memory WDS refreshes content automatically in the browser
while you develop against it.

WDS allows you to replace specific modules on the fly without blowing away the state of the application.

Although WDS operates in memory, by default for perf. it is possible to emit files to the file system,
and the [https://www.npmjs.com/package/write-file-webpack-plugin]('write-file-webpack-plugin') allows you to do this.

WDS functionality is configured through the devServer field in the webpack configuration.

It's possible to get webpack to auto reload when config is changed by using nodemon.

It's also possible to set up an express server and use a middleware. There are a couple of options:
- [https://webpack.js.org/guides/development/#using-webpack-dev-middleware](Official WDS Middleware)
- [https://www.npmjs.com/package/webpack-hot-middleware](webpack-hot-middleware)
- [https://www.npmjs.com/package/webpack-isomorphic-dev-middleware](webpack-isomorphic-dev-middleware)

[https://www.npmjs.com/package/webpack-plugin-serve](webpack-plugin-serve) is another alternative to webpack-dev-server

There is a whole host of development plugins out there:
- [https://www.npmjs.com/package/react-dev-utils](react-dev-utils)
- [https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin](case-sensitive-paths-webpack-plugin)

There also lots of output plugins that make the webpack output easier to understand:
- [https://www.npmjs.com/package/webpack-notifier](webpack-notifier)
- [https://www.npmjs.com/package/nyan-progress-webpack-plugin](nyan-progress-webpack-plugin)

## Composing Configuration

You can manage webpack config in the following ways:
- Maintain config in multiple files for each env and point to each using the config param.
- push config to a library which you then consume:
  1. [https://www.npmjs.com/package/hjs-webpack](hjs-webpack)
  2. [https://neutrino.js.org/](Neutrino)
- Push config to a tool
- Manage all config in single file and branch there with --env approach.

It's possible to Configure webpack through composition and merging.

- [https://www.npmjs.org/package/webpack-merge](webpack-merge) is a very useful tool for this. As is
- [https://www.npmjs.com/package/webpack-chain](webpack-chain)

Webpack relies on the [http://yargs.js.org/docs/#parsing-tricks-dot-notation](yargs) package for parsing arguments

There are lots of benefits of composing configuration. composition can be split into dependencies, and abstracted
allowing for commonly using conifgurations to be tweaked and easily rolled out across a number of projects.

### Config Layouts
- Split per configuration target
- Split parts per purpose

