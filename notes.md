
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

# Chapter 2 - Styling

To load css you need to use css-loader and style-loader.

[https://www.npmjs.com/package/css-loader](css-loader) foies though possible @import and url() lookups 
within matched files. External resources are skipped.

[https://www.npmjs.com/package/style-loader](style-loader) injects the styling through a style element. The way it does this can be customised.

Matched files can nbe processed through loaders such as:
- [https://www.npmjs.com/package/file-loader](file-loader) and,
- [https://www.npmjs.com/package/url-loader](url-loader)

The [https://www.npmjs.com/package/mini-css-extract-plugin](MiniCssExtractPlugin) can be used to generate a separate CSS
file.

Files are evaluated from right to left, therefore,
["style-loader", "css-loader"] is like styleLoader(cssLoader(input))

css-loader doesn't touch absolute imports, although 
webpack-dev-server and [https://www.npmjs.com/package/copy-webpack-plugin](copy-webpack-plugin) can help copy files
outside of webpack.

Using a Tilde character ~ tells webpack that an  import isn't 
relative and then by default it will check node_modules for 
the import. This can be configured with the "resolve.modules" 
field.

Although it is possible to refer to styling through javascript and is recommended, it is also possible to achieve the same result through an entry and globbing files.

e.g.

```javascript
...
const glob = require('glob');

...

const commonConfig = merge([
  {
    entry: {
      ...
      style: glob.sync("./src/**/*.css"),
    },
    ...
  },
  ...
]);
```

With globbing you no longer get CSS Modules, and you have to be careful with ordering as well. To have strict control over ordering, it is recommended to set up single CSS entry and use
@import to bring in rest of project in order.

### Eliminating Unused CSS

[https://www.npmjs.com/package/purifycss](PurifyCSS) is a tool that can achieve this through analyzing files. Not perfect but works with SPAs to an extent.

[https://www.npmjs.com/package/uncss](uncss) fires up phantom and traverses your app to identify css.

Purify supports additional options such as minification and whitelisting of required styles.

### Critical Path Rendering

- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](critical-path-rendering) seems to optimize for render order and emphasizes above-the-fold css.

Other include:
- [https://www.npmjs.com/package/webpack-critical](webpack-critical)
- [https://www.npmjs.com/package/html-critical-webpack-plugin](html-critical-webpack-plugin)
- [https://www.npmjs.com/package/isomorphic-style-loader](isomorphic-style-loader)

This lists other critical tools that are available, [https://github.com/addyosmani/critical-path-css-tools](critical-path-css-tools)

### Autoprefixing

Autoprefix can be used to add necessary prefixes to different 
css properties in order to allow you to support different browsers. Autoprefixc 

Browsers to support can be configured using a [https://www.npmjs.com/package/browserslist](.browserslistrc) file.

Linting of CSS can be set up using the postcss-loader from [http://stylelint.io/](stylelint).

# CHAPTER 3 - LOADING ASSETS

## Loader Definitions

Multiple ways to use loaders. Preferable to use absolute paths here as they allow you to move config without breaking assumptions.

Assuming you set an include or exclude rules, packages loaded from node_modules work as the assumption is that they have been compiled in such 
a way that they work out of the box. If this isn't the case, you will need to apply skills learned in the consuming packages chapter.

e.g.

```javascript

module.exports = {
  ...
  module: {
    rules: [
      {
        // ** Conditions ** to match files using RegExp, function
        test: /\.js$/,

        // ** Restrictions **
        // Restrict matching to a directory. This
        // also accepts an array of paths or a function.
        // the same applies to exclude
        include: path.join(__dirname, "app"),
        exclude(path) {
          // you can perform more complex checks as well
          return path.match(/node_modules/);
        },

        // **Actions** to apply loaders to the matched files
      }
    ]
  }
}

```

Loaders always evaluate loaders from right to left:

```javascript
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
},
```

The above can be split it while also being equivalent:


```javascript
{
  test: /\.css$/,
  use: "style-loader",
},
{
  test: /\.css$/,
  use: "css-loader",
},
```

The enforce rule for loaders can force loaders to be used pre or post other package. e.g.
pre:
- linting
- tests
post:
- build analysis

If you want to use more than one loader, you can pass more than one loader to use and expand from there:

```javascript
{
  test: /\.js$/,
  include: PATHS.app,
  use: [ {
      loader: "babel-loader",
      options: {
        presets: ["env"],
      },
    },
    // Add more loaders here
  ],
}
```

### Branching at the use function

It's also possible to branch at 'use' as webpacks loader definitions accept functions, e.g.

```javascript
{
  test: /\.css$/,

  // `resource` refers t the resource path matched.
  // `resourceQuery` contains possible query passed to it
  // `issuer` tells about the match context path
  use: ({ resource, resourceQuery, issuer }) => {
    // You have to return something falsy, object, or
    // a string (i.e., "style-loader") form here.
    //
    // returning an array fails! Nest rules instead.
    if (env === 'development') {
      return {
        use: {
          loader: "css-loader", // css-loader first
          rules: [
            "style-loader", // style-loader after
          ],
        },
      };
    }
  },
}
```

It's possible to write loader definitions inline.

### Loading Based on resourceQuery

oneOf field makes it possible to route webpack to a specific loader based on a resource related match.

```javascript
{
  test: /\.png$/,
  oneOf: [
    {
      resourceQuery: /inline/,
      use: "url-loader"
    },
    {
      resourceQuery: /external/,
      use: "file-loader"
    },
  ],
},
```

### Loading based on issuer

issuer can be user to control behaviour based on where a resource
was imported.

e.g. below style-loader is used when webpack captures a css file from
a JS import.

```javascript
{
  test: /\.css$/,
  rules: [
    {
      issuer: /\.js$/,
      use: "style-loader",
    },
    {
      use: /css-loader/,
    },
  ],
},
```

The prior example could also be written using a mix of issuer and not:

```javascript
{
  test: /\.css$/,

  rules: [
    // CSS imported from other modules is added to the DOM
    {
      issuer: { not: /\.css$/ },
      use: "style-loader",
    },
    // Apply css-loader against CSS imports to return CSS
    {
      use: "css-loader",
    },
  ],
}
```

### Understanding Loader behaviour

Loader behaviour can be understood in greater detail by inspecting them.
[https://www.npmjs.com/package/loader-runner](loader-runner) allows you to run loaders
in isolation without webpack.

[https://www.npmjs.com/package/inspect-loader](inspect-loader) allows you to see what's being
passed between loaders.

## Loading Images

Differences between HTTP/1 and HTTP/2 require different approaches to performance, Webpack allows
preparation for different approaches.

Webpack an inline assets using the [https://www.npmjs.com/package/url-loader](url-loader). It emits images as base64 strings within your bundles.

[https://www.npmjs.com/package/file-loader](file-loader) outputs image files and returns paths to them instead of inlining. This technique
works with other asset types.

### Setting Up url-loader.

url-loader is a good starting point for develpment purposes. It comes with a limit option that can defer to file-loader beyond a certain point.

to load .jpg and .png files while inlining below 25kb you would have to set up a loader,

```javascript
{
  test: /\.(jpg|png)$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 25000,
      fallback: "file-loader"
    }
  }
}
```

### Setting up file-loader

```javascript
{
  test: /\.(jpg|png)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[path][name].[hash].[ext]",
    }
  }
}
```

# !!Be careful not to use multiple loaders on the images.

### Loading SVGs

Easiest way is through file-loader.

You can refer to them through url() values.

following loaders are also applicable:
[https://www.npmjs.com/package/raw-loader](raw-loader)
[https://www.npmjs.com/package/svg-inline-loader](svg-inline-loader)
[https://www.npmjs.com/package/svg-sprite-loader](svg-sprite-loader)
[https://www.npmjs.com/package/svg-url-loader](svg-url-loader)
[https://www.npmjs.com/package/react-svg-loader](react-svg-loader)

### Optimizing Images

These types of loaders should be used first (last entry in use listing).

For images:
- [https://www.npmjs.com/package/image-webpack-loader](image-webpack-loader)
- [https://www.npmjs.com/package/imagemin-webpack-plugin](imagemin-webpack-plugin)
Svg Specific:
- [https://www.npmjs.com/package/svgo-loader](svgo-loader)


##/3 Utilizing srcset

These loaders allows you to generate srcet compatible collections of images for modern browsers
This gives more control to the browser as to which images to load and when for better perf.

## Loading Images Dynamically

Allows you to load images based on a condition. See Code-splitting and dynamic loading chapter.

### Loading Sprites

Spriting allows you to package multiple images into a single file (less requests).
- [https://www.npmjs.com/package/webpack-spritesmith](webpack-spritesmith)

### Using Placeholders

[https://www.npmjs.com/package/image-trace-loader](image-trace-loader) loads images and exposes the results as image/svg+xml URL encoded data.
It can be used in conjunction with file-loader and url-loader for showing a placeholder
while the image is being loaded.

[https://www.npmjs.com/package/lqip-loader](lqip-loader) is similar but provides a blurred image instead.

### Getting image dimensions

Sometimes getting only the reference isn't enough. [https://www.npmjs.com/package/image-size-loader](image-size-loader) 
emits image dimensions, type and size in addition to a reference to the image itself.

### Referencing Images

Webpack can pick images from stylesheets in @import and url() statements. You can also
reference images directly in your JS files

```javascript
import src from "./avatar.png";

const Profile = () => <img src={src} />;
```
the [https://www.npmjs.com/package/babel-plugin-transform-react-jsx-img-import](babel-plugin-transform-react-jsx-img-import)
can generate the require automatically. so above becomes

```javascript
const Profile = () => <img src="avator.png">;
```

You can also set up dynamic imports as discussed in the Code 
Splitting Chapter.

```javascript
const src = require(`./avatars/${avatar}`)
```

### Images and css-loader gotcha

If you are using images and css-loader with the sourceMap option
enabled, it's important that you set output.pubicPath to an absolute
value pointing to the development server.

## Loading Fonts

Loading fonts involves deciding which browsers will require a
'first-class' service and which can fall back to the system fonts.

Font test patterns tend to be more complicated than other formats.

[https://www.npmjs.com/package/canifont](canifont) can be used to figure out which browsers to support.

### Choosing One Format

All browsers support the .woff format, it's newer version is .woff2,
and is widely supported by most modern browsers.

```javascript
const config = {
  // Match woff2 in addition to patterns like .woff?v=1.1.1
  test: /\.(woff|woff2)(\?v=\d+\.\d+$/)/,
  use: {
    loader: "url-loader",
    options: {
      // Limit at 50k. Above that it emits separate files
      limit: 50000,

      // url-loader set mimetype if it's passed.
      // without this it derives it from the file extension
      mimetype: "application/font-woff",

      // Output below fonts directory
      name: "./fonts/[name].[ext]",
    },
  },
};
```

### Supporting Multiple Formats

You can support multiple formats and by adjusting the test 
statement. You will need to ensure that you order your @font-face
definition carefully so that newer formats are read first. e.g.

```css
@font-face {
  font-family: "myfontfamily";
  src: url("./fonts/myfontfile.woff2") format("woff2"),
    url("./fonts/myfontfile.woff") format("woff"),
    url("./fonts/myfontfile.eot") format("embedded-opentype"),
    url("./fonts/myfontfile.ttf") format("ttf");
    /* Add other formats as you see fit */
}
```

### Manipulating file-loader Output Path and publicPath

file-loader allows the shaping of output, so you can output fonts
below fonts/ and images below images/ for example.

Furthermore, it's possible to manipulate publicPath and override 
the default per loader definition. e.g.

```javascript
const config = {
  // Match woff2 and patterns like .woff?v.1.1.1
  test: /\.woff2?(\d+\.\d+\.\d+)?$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 50000,
      mimetype: "application/font-woff",
      name: "./fonts/[name].[ext]", // Output below ./fonts
      publicPath: "../", // Take the directory into account
    },
  },
},
```

### Generating Font Files Based on SVGs

If you prefer to use SVG based fonts, they can be bundled as a 
single font file by using [https://www.npmjs.com/package/webfonts-loader](webfonts-loader). Be careful not to let it interfere
with any other SVG loading you have in place.

### Using Google Fonts

the [https://www.npmjs.com/package/google-fonts-webpack-plugin](google-fonts-webpack-plugin) can download google fonts to webpacks
build directory or connect them using a CDN.

### Using Icon Fonts

[https://www.npmjs.com/package/iconfont-webpack-plugin](iconfont-webpack-plugin) simplifies loading icon based fonts. It
inlines SVG references within CSS files.

## Loading Javascript

Webpack process ES2015 module definitions by default, and transforms
them into code.

By running code through Babel, it allows you to ue ES2015 features
and more.

### Using Babel with Webpack Configuration

During development on a modern browser it isn't necessary to run 
code through Babel if you develop on a modern browser but is most
likely a necessity when you build for production. the [https://www.npmjs.com/package/babel-loader](babel-loader) can use your 
existing babel configuration or can be defined in the loader itself.
[https://www.npmjs.com/package/babel-webpack-plugin](babel-webpack-plugin) is another option.

### Setting up babel-loader

@babel/preset-env allows you to polyfill certain language features 
for older browsers. You should enable it's useBuiltIns options and install @babel/polyfill. You have to install it in your project 
either through an entry or in your project.

[https://babeljs.io/docs/usage/polyfill/](@babel/polyfill) pollutes the global scope with objects like promise.
Therfore it may be useful to add [https://babeljs.io/docs/plugins/transform-runtime/](@babel/plugin-transform-runtime).

Certain features such as Code Splitting write Promise based code
to webpack's bootstrap after webpack has processed loaders. The 
problem can be applied by applying a shim before the application
code has executed. 

### Babel Tips

There are other babel tips. It's a good idea to add specific experimental features with specified presets. It's better
to document features that are being used well.

[https://buble.surge.sh/](Buble) is another compiler worth checking out.

### Useful Babel Plugins

- [https://www.npmjs.com/package/babel-plugin-import](babel-plugin-import) allows you not to point to exact path of file
- [https://www.npmjs.com/package/babel-plugin-import-asserts](babel-plugin-import-asserts) asserts that imports have been defined
- [https://www.npmjs.com/package/babel-plugin-jsdoc-to-assert](babel-plugin-jsdoc-to-assert) converts jsdoc annotations to runnable assertions
- [https://www.npmjs.com/package/babel-plugin-log-deprecated](babel-plugin-log-deprecated) adds console.warn to functions that have @deprecate annotation in their comment
- [https://www.npmjs.com/package/babel-plugin-annotate-console-log](babel-plugin-annotate-console-log) annotates console.log statements with invocation context,
so it's easier to see where they are logged.
- [https://www.npmjs.com/package/babel-plugin-sitrep](babel-plugin-sitrep) logs all assignments of a function and prints them.
- [https://www.npmjs.com/package/babel-plugin-webpack-loaders](babel-plugin-webpack-loaders) allows you to use some webpack loaders through babel.
- [https://www.npmjs.com/package/babel-plugin-syntax-trailing-function-commas](babel-plugin-syntax-trailing-function-commas) adds trailing comma support for functions.
- [https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types](babel-plugin-transform-react-remove-prop-types) allows you to remove propType related code from your production build. 

### Enabling Presets and Plugins per environment

env checks both NODE_ENV and BABEL_ENV and adds functionality to your build based
on that. If BABEL_ENV is set it overrides NODE_ENV

It's possible to pass webpack env variable to babel with a tweak.

### Setting up Typescript

You can use Typescript with webpack using the following loaders:
- [https://www.npmjs.com/package/ts-loader](ts-loader)
- [https://www.npmjs.com/package/awesome-typescript-loader](awesome-typescript-loader)

### Setting up Flow

static analysis tool used by facebook.
- [](flow-status-plugin)
- [](babel-plugin-syntax-flow)
- [](babel-plugin-typecheck)


# Chapter 4 - Building


## Sourcemaps

Sourcemaps works for both Javscript and Styling files. 

One approach is to disable source maps during development and use ES2015 without any
extensions and develop using a modern browser. In Webpack 4, source maps work out
of the box when you run it in development mode.

Sourcemaps can be inline (handy during development) or separate which is better for prod.

Hidden source maps give stack trace info only, and you can connect to a monitoring service.

## Enabling Sourcemaps in Webpack

See example code...

To see sourcemaps you need to enable them in the browser as per the instructions.

### There are different types of sourcemaps.

Inline Source map types:
- "eval" - lowest qual
- "cheap-eval-source-map"
- "cheap-module-eval-source-map"
- "eval-source-map" - highest qual

Separate Source Map Types:
- "cheap-source-map" - misses column mappings
- "cheap-module-source-map" - (potentially broken when minification is used)
- "hidden-source-map" - doesn't write references to source maps in source files.
- "nosources-source-map" - doesn't expose source code to client.
- "source-map" - best quality (but slowest)

### Other source map options

```javascript
const sourceMapEx = {
  output: {
    // Modify the name of the gnerated source map file
    // You can use [file], [id], and [hash] replacements here.
    // The default option is rnough for most use cases.
    sourceMapFilename: '[file].map', // Default

    // This is the source map filename template. It's default
    // format depends on the devtool option used. You don't
    // need to modify this often.
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
  }
}
```

[](terser-webpack-plugin) can break sourcemaps if not configured correctly.

### SourceMapDevToolPlugin

This plugin allows more granular contorl over sourcemaps. Allows you to skip
devtool option altogether.

Webpack modules match only .js and .css file by default so using a more
inclusive test pattern can get around this, e.g.

```javascript
/\.(js|jsx|css)($|\?)/i
```

### Dependency Source Maps

You can use the [https://www.npmjs.com/package/source-map-loader](source-map-loader) to
make webpack aware of them.

### Sourcemaps for stylesheets

You can enable the sourceMap options. css-loader is known to have issues with relative
paths, so you should set output.publicPath to resolve the server url.

## Bundle Splitting

Bundle spltting can be achieved using "optimization.splitChunks.cacheGroups". When running
in production mode, webpack 4 perform a series of splits out of the box.

In order to invalidate bundles correctly you have to attach hashes to the generated bundles
as discussed in the Adding Hashes to Filenames chapter.

### The Idea of Bundle Splitting

Quick win is to split vendor and application code into their own bundles.

You can rely on automated splitting provided by webpack or you can customise and define it yourself.

### Splitting and Merging Chunks

Webpack provides more control over the generated chunks by two plugins:
- AggressiveSplitting
- AggressiveMergingPlugin

Former allows you to emit more and smaller bundles. (handy with HTTP/2)

basic idea of aggressive splitting:

```javascript
const aggressiveSplit = {
  plugins: [
    new webpack.optimize.AggressiveSplittingPlugin({
      minSize: 10000,
      maxSize: 30000,
    })
  ]
}
```

It's a balancing act, as you lose some benefits of caching if you split into multiple 
bundles and you can be overloaded with requests in HTTP/1 environments. This approach
doesn't work with HtmlWebpackPlugin due to a bug in the plugin.

Aggressive merging plugin goes the other way and combines small bundles into bigger ones.

```javascript
const aggressiveMerging = {
  plugins: [
    new AggressiveMergingPlugin({
      minSizeReduce: 2,
      moveToParents: true,
    }),
  ],
};
```

Possible to get good caching with these pkugins if webpack records are used. 

webpack.optimize contains:
- LimitChunkCountPlugin
- MiniChunkSizePlugin
which give more control over chunk size.

See [https://medium.com/webpack/webpack-http-2-7083ec3f3ce6](Tobias Koppers discussion for more detail)

### Chunk Types in Webpack

- Early Chunks: Entry chunks contain webpack runtime and modules it then loads.
- Normal Chunks: Don't contain webpack runtime and can be loaded dynamically when webpack loads.
- Initial Chunks: normal chunks that count towards the initial loading time of the application. You should
  focuse on the other two.

## Code Splitting

Code splitting allows you to split bundles, and allows loading code lazily as you need it.

You can load more code as a user enters different parts of the application. You can link loading to a specific
action. You can use predictions to guess what a user is going to go next. It's possible to implement Google's [https://developers.google.com/web/fundamentals/performance/prpl-pattern/](PRPL)
pattern using webpack's lazy loading. PRPL (Push, Render, Pre-cache, Lazy-load) has been designed with the mobile web in mind.

Code splitting can be done in two primary ways in webpack: through dynamic import or require.ensure syntax. 

Goal is to get a split point that is only loaded on demand. There can be splits inside splits (splinception)

## Dynamic import

The dynamic import syntax isn't in the official language specification yet. Minor tweaks are needed especially at the Babel setup for this reason.

Dynamic imports are defined as promises.

```javascript
import(/* webpackChunkName: "optional-name" */ "./module").then(
  module => {...}
).catch(
  error => {...}
)
```

The optional name allows you to pull multiple splits points into a single bundle. As long as they have the same name, they will be grouped. Each split point
generates a new bundle by default. 

The interface allows composition, and you could load multiple resources in parallel:

```javascript
Promise.all([
  import("lunr"),
  import("../search_index.json")
]).then((lunr, search) => {
  return {
    index: lunr.Index.load(search.index),
    lines: search.lines,
  };
});
```

notes:
- The syntax only works with JS after configuring it the right way.
- There's an older syntax require.ensure and require.include
- (https://github.com/webpack/webpack-pwa)[webpack-pwa] illustrates the idea on a larger scale.

You can review the output of your build to check where split points are. Webpack wraps the blocks in a webpackJsonp block, and processes
the code bit.

- if you want to adjust the name of a chunk you can set ouput.chunkFilename. e.g. "chunk.[id].js" would prefix each spplit chunk with the
word chunk.

- [https://www.npmjs.com/package/bundle-loader](bundle-loader) gives similar results but through a loader interface, supports bundling through it's name option.

### Code Splitting In React

[https://gist.github.com/lencioni/643a78712337d255f5c031bfc81ca4cf](Airbnb example by Joe Lencioni)

Other options:
- [https://www.npmjs.com/package/react-async-component](react-async-components)
- [https://www.npmjs.com/package/loadable-components](loadable-components)

See loadable components info for more

## Tidying Up

To tidy up webpack between builds you could either schedule a 'rm -rf ./build && webpack' between builds or you can run an npm script to keep
it cross platform. A task-runner could work for this purpose as well.

### Setting Up [https://www.npmjs.com/package/clean-webpack-plugin](CleanWebpackPlugin)

You can add this plugin to ensure that old / stale files don't stay in the build folder after newer builds are created.

### Attaching a revision to the build

Attaching info related to the current build can be useful for debugging purposes.
[https://webpack.js.org/plugins/banner-plugin/](webpack.BannerPlugin) can support this and can be used alongside [https://www.npmjs.com/package/git-revision-webpack-plugin](git-revision-webpack-plugin) to generate a small comment at the beginning of the generated files.

See code for examples.

After building you will get a comment a the beginning of the file with version information etc. The banner can be adjusted by passing information
revision information info webpack.DefinePlugin.

### Copying Files

Copying files is another ordinary operation you can handle with webpack. the [https://www.npmjs.com/package/copy-webpack-plugin](copy-webpack-plugin)
can be handy if you need to bring in external files. [https://www.npmjs.com/package/cpy-cli](cpy-cli) is a good cross-platform way to copy files
from outside of webpack.


# Chapter 5 - Optimizing

## Minifying

Since webpack 4, production output gets minified using [https://www.npmjs.com/package/terser](terser) by default. Terser is ES2015+ comptible JS Minifier.

### Minifying JS

Minification involves safely rewriting code to make it more compact. e.g. will rename variables and remove unreachable blocks of code. Unsafe transformations
can break code. e.g. Angular 1 parameter naming for modules.

The JS minification process can be configured using the:
- optimization.minimize (toggle) and
- optimization.minimizer (configuration array)

Other options for minification:
- [https://www.npmjs.com/package/babel-minify-webpack-plugin](babel-minify-webpack-plugin) relies on [https://www.npmjs.com/package/babel-preset-minify](babel-present-minify) and is developed by the Babel team
- [https://www.npmjs.com/package/webpack-closure-compiler](webpack-closure-compiler) runs parallel and can give smaller results than the babel option.
- [https://www.npmjs.com/package/closure-webpack-plugin](closure-webpack-plugin) is another option
- [https://www.npmjs.com/package/butternut-webpack-plugin](butternut-webpack-plugin) uses Rich Harris' experimental butternut minifier.

### Speeding Up JS Execution

There are a few techniques that are used to create code that will run faster.
- Scope Hoisting: Hoists all modules to a single scope instead of writing separate closures for each. This slows the build
  but speeds up execution.
- Pre-evaluation: [https://www.npmjs.com/package/prepack-webpack-plugin](prepack-webpack-plugin) uses Prepack which rewrites computations that are able to
be done at compile time. e.g. unrolling for loops and any functions that only return defined values. Other examples are: [https://www.npmjs.com/package/val-loader](val-loader) and [https://www.npmjs.com/package/babel-plugin-preval](babel-plugin-preval)
- Improving Parsing: [https://www.npmjs.com/package/optimize-js-plugin](optimize-js-plugin) relies on optimize-js by Nolan Lawson.

### Minifying Html

If you consume HTML templates through [https://www.npmjs.com/package/html-loader](html-loader) your code you can use [https://www.npmjs.com/package/posthtml](posthtml) with [https://www.npmjs.com/package/posthtml-loader](posthtml-loader) and [https://www.npmjs.com/package/posthtml-minifier](posthtml-minifier) to minify your html.

### Minifying CSS

[https://www.npmjs.com/package/clean-css-loader](clean-css-loader) allows you to use a popular CSS minifier clean-css.

[https://www.npmjs.com/package/optimize-css-assets-webpack-plugin](optimize-css-assets-webpack-plugin) is a plugin based option that applies a minifier on CSS assets. Using MiniCssExtractPlugin can lead to duplicated CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoid this problem by operating on the generated result.

Of the CSS Minification options, OptimizeCSSAssetsPlugin composes the best. To use attached it and [http://cssnano.co/](cssnano).

### Minifying Images

Image size can be reduced using
- [https://www.npmjs.com/package/img-loader](img-loader),
- [https://www.npmjs.com/package/imagemin-webpack](imagemin-webpack) and
- [https://www.npmjs.com/package/imagemin-webpack-plugin](imagemin-webpack-plugin). These packages use image optimizers underneath.

It is advised to use cache-loader and thread-loader with these as discussed in the Performance chapter as they can be substantial operations.

## Tree Shaking

Tree Shaking is enabled by the ES2015 module definition. The idea is it's possible to analyze the module definition statically without running it, to tell
which code is used and which isn't. Tree shaking can also work to an extent through [https://www.npmjs.com/package/webpack-common-shake](webpack-common-shake)
which utilises the CommonJS module definition.

Tree shaking identifies through the use of named imports and exports which code is and isn't used.

There is a CSS Modules related tree-shaking. See [https://www.npmjs.com/package/purgecss](purgecss)

### tree shaking on a package level.

The same idea can work with dependencies that use the ES2015 module definition. Given the related packaging, standards are still emerging. Webpack attempts
to resolve the package.json module field for this reason.

To get the most out of tree shaking with external packages you have to use [https://www.npmjs.com/package/babel-plugin-transform-imports](babel-plugin-transform-imports) to rewrite impors so that they work with webpack's tree-shaking logic. See [https://github.com/webpack/webpack/issues/2867](Webpack's issue 2867) for more information.

## Environment Variables

Webpakcks DefinePlugin enables the replacing of free variables so that you can convert if (process.env.NODE_ENV === "development") kind of code to if (true) or if (false)
depending on the environment.

Using the DefinePlugin can bring down the size of your React production bulid somewhat as a result. Webpack 4 sets process.env.NODE_ENV based on the given mode. Elimination if the core idea of DefinePlugin and allows toggling. A minifier performs analysis on the code and is able to 'toggle' i.e. conditionally remove, entire portions of code.

It's also possible to use babel to replace free variables.

webpack can allow you to use the environment variables to export specific sections of a module.

### Adding Hashes to Filenames

Webpack provides placeholders for this purpose. String are used to attach specific info to the webpack output.

- [id] - returns the chunk id
- [path] - returns the file path
- [name] - returns the filename
- [ext] - returns the ext for most available fields
- [hash] - return the build hash. If any portion of the build changes, this will change true.
- [chunkhash] - returns entry chunk-specific hash. Each entry defined in config recieves a hash of it's own, therefore,
  if the chunk changes, the hash will change as well.
- [contenthash] - returns has based on content

one should only use hash and chunkhash in production as it doesn't help much during development.

You can slice hash and chunkhash likes follow: [chunkhash: 4] returns the first for chars of the hash.

Adding hashes to filenames is the best way to invalidate a cache.

[hash] is defined differently for file-loader than for the rest of webpack.

If you used chunkhash for extracted CSS as well, this would lead to problems as the code points to the CSS through JavaScript bringing it
to the same entry, That means if the application code or CSS changed, both would be invalidated. Therefore instead of hash you shoudl use 
contenthash.

## Separating a Manifest

When webpack writes bundles, it maintains a manifest. You can find it in the generated vendor bundle. The manifest describes what files webpack should load.

By extracting the manifest, it means if the src code changes, the manifest changing won't trigger a change in the vendor package.

### Extracting a manifest 

To extract a manifest define optimization.runtimeChunk as done in code example.

As this is being used with HtmlWebpackPlugin, it's not required to add the reference in index.html ourselves.

Some plugins allow you to inline the manifest plugin to prevent an additional request.
- [https://www.npmjs.com/package/inline-manifest-webpack-plugin](inline-manifest-webpack-plugin)
- [https://www.npmjs.com/package/html-webpack-inline-chunk-plugin](html-webpack-inline-chunk-plugin)
- [https://www.npmjs.com/package/assets-webpack-plugin](assets-webpack-plugin)

### Using Records

Plugins such as the AggressiveSplittingPlugin use records to implement caching. The approaches discussed are still valid
but records goes one step further.

Records store module ids across separate builds. Problem is the file needs to be saved. By adding a recordsPath to the config,
webpack writes the file and then is able to reference and rewrite the file on subsequent builds. Can be particularly valuable
if you jabe a complicated setup and want to check the correct caching behaviour.

## Build Analysis

To get suitable output, you should tweak the configuration. By adding the json arg with a suitable output path, you can
gain insight into your builds. These stats can be pushed through various tools to help you better assess and understand
your output.

Following flags are also useful:
- --profile to capture timing related information
- --progress to show how long webpack spent in different stages of the build.

Stats can be captured through node. Since stats can contain errors, it's wise to handle those independently.

```javascript
const webpack = require('webpack')
const config = require('./webpack.config.js')('production')

webpack(config, (err, stats) => {
  if (err) {
    return console.error(err);
  }

  if (stats.hasErrors()) {
    return console.error(stats.toString("errors-only"));
  }

  console.log(stats)
});
```

If you want JSON output use stats.toJson(). to get verbose, use stats.toJson("verbose")

to mimic --json flag use console.log(JSON.stringify(stats.toJson(), 2));

Useful stats plugins are:
- [https://www.npmjs.com/package/stats-webpack-plugin](stats-webpack-plugin)
- [https://www.npmjs.com/package/webpack-stats-plugin](webpack-stats-plugin)

### Webpack enables you to use a performance budget

If budget is configured, and then is not met, the build is terminated.

Useful tools:
- [https://github.com/webpack/analyse](The Official Analyse tool)
- [https://chrisbateman.github.io/webpack-visualizer/](Webpack Visualiser)
- [https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin](duplicate-package-checker-webpack-plugin) - warns if find dup packages.
- [https://alexkuz.github.io/webpack-chart/](Webpack Chart)
- [https://www.npmjs.com/package/webpack-unused](webpack-unused)
- [https://www.npmjs.com/package/webpack-bundle-analyzer](webpack-bundle-analyzer) - This is a good one <-

There are a range of tools for duplication analysis:
- [https://www.npmjs.com/package/inspectpack](inspectpack)
- [https://www.npmjs.com/package/bundle-duplicates-plugin](bundle-duplicates-plugin) - operates on a funciton level.
- [https://www.npmjs.com/package/find-duplicate-dependencies](find-duplicate-dependencies) - operates on dependencies.
- [https://www.npmjs.com/package/depcheck](depcheck) - check redundant or missing packages from project.
- [https://www.npmjs.com/package/bundle-buddy](bundle-buddy) and [https://www.npmjs.com/package/bundle-buddy-webpack-plugin](bundle-buddy-webpack-plugin) allows
  a user to find duplicates across bundles and can allow you to fine tune your splitting behaviour.

## Performance

Good ground rules when it comes to optimization:
1. Know what to optimize.
2. Perform fast to implement tweaks first.
3. Perform more involved tweaks after.
4. Measure impact.

Optimizations come at a cost, make configuration harder to understand or tie it to a particular solution. Often the best optimization is to do
less work or do it more smartly.

### Measuring Impact

Generating stats can be useful to measure build time. [https://www.npmjs.com/package/speed-measure-webpack-plugin](speed-measure-webpack-plugin) gives you
more granular information per plugin and loader so you know which take the most time in your process.

### High-Level Optimizations

Webpack uses only a single instance by default meaning you aren't able to benefit from a multi-core processor without extra effort.
- [https://www.npmjs.com/package/parallel-webpack](parallel-webpack)
- [https://www.npmjs.com/package/happypack](HappyPack)

### parallel webpack

Assuming you have defined your config as an array, it can run configurations in parallel. It can also generate builds based on variants.

Variants can be used to define feature flags etc. The underlying idea can be implemented using a worker-farm and parallel-webpack uses
[https://www.npmjs.com/package/worker-farm](worker-farm) underneath.

### HappyPack - File Level Parallelism

HappyPack is more involved. It intercepts the loader calls that you specify and then runs them in parallel.

it involves intercepting the babel-loader and then replacing babel-loader where it's called. generally this will
result in coupling HappyPack within your configuration but this can be designed away if done so carefully.

Low-level optimisations.
- Consider using different source-maps during development.
- Use @babel/present-env during dev instrad of source-maps to transpile fewer features for modern browsers.
- Skip polyfills during development.
- Disable portions of your code during development.
- Polyfill less of Node. To disable entirely, set node to false directly. [https://webpack.js.org/configuration/node/](see webpack docs) for more information
- Push bundles that change less to Dynamically Loaded Libraries (DLL) to avoid unecessary processing. see [https://github.com/webpack/webpack/tree/master/examples/dll-user](official webpack example)

Plugin-Specific Optimizations
- Utilizing caching through plugins like [https://www.npmjs.com/package/hard-source-webpack-plugin](hard-source-webpack-plugin) to avoid unnecessary work.
- Use equivalent, but lighter alternatives, of plugins and loaders during development.

Loader Specific Optimizations
- Do less processing by skipping loaders during development.
- Use either include or exclude with JS specific loaders.
- Cache the results of expensive loaders. (image-manipulation)
- Parallelize the execution of expensive loaders using thread-loader.

### Optimizing Rebundling

It's possible to optimise rebundling times during development by pointing the dev setup
to a minified version of a library.

module.noParse accepts a RegExp or an array of RegExps. In addition to telling webpack 
not to parse the minified file you want to use, you also have to point react at the alias,
by using resolve.alias.

```javascript
export.dontParse = ({ name, path }) => {
  const alias = {};
  alias[name] = path;

  return {
    module: {
      noParse: [new RegExp(path)],
    },
    resolve: {
      alias,
    },
  };
};

dontParse({
  name: "react",
  path: path.resolve(
    __dirname, "node_modules/react/cjs/react.production.min.js",
  ),
}),
```

You could also ignore all minified files by passing the RegExp of /\.min\.js/ to the noParse arg.

Not all modules support module.noParse.

# Chapter 6

## Build Targets

Webpack's output target is controlled by the target field.

### Web Targets

Webpack targets the web by default. It bootstraps the application and loads it's modules.

The initial load list of modules is maintained in the manifest and then the modules can load eachother as defined.

### Web workers

The web worker target wraps your application. Using web workers is valuable if you want to execute computation off of the main
thread of the application without slowing the user interface.

Limitations are:
- You cannot use webpack's hashing features when the webworker target is used.
- You cannot not mutate the DOM from a web worker.

### Node Targets

Webpack provides two node-specific targets, 'node' and 'async-node'. It used standard node require to load chunks
unless async mode is used. In that case, it wraps modules so that they are loaded asynchronously through Node fs and vm modules.

The main use case for using NOde target is Server Side Rendering (SSR).

### Desktop Targets
There are desktop shells such as NW (node-webkit) and Electron (prev. Atom). Webpack can target them as follows:
- node-webkit - Targets NW while considered experimental
- atom, electron, electron-main - Targets Electron main process.
- electron-renderer - Targets Electron renderer process.

[https://github.com/chentsulin/electron-react-boilerplate](electron-react-boilerplate) is a good starting point
for electron and react development.

## Multiple Pages

it's possible to use webpack for multiple pages also. Similar to outputting multiple files in targets chapter. However
to generate separate pages. It's achievable through HtmlWebpackPlugin and some config.

Possible Approaches:
- Go through multiple-compiler mode and return array of configs. Approach is minimal and effective if less need to share
code between them. You can benefit through parallel webpack to improve build performance.
- Set up single config and extract commonalities.
- Follow idea of PWA, you can either have an app shell or a page shell and load portions of the app as it's used.

### Generating Multiple Pages

Abstracting Pages - To initialize a page, it should receive a page-title, output path, and an optional template at least.

It can be modeled as a configuration part:

```javascript
/* webpack.parts.js */
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.page = ({
  path = "",
  template = require.resolve(
    "html-webpack-plugin/default_index.ejs"
  ),
  title,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + "/"}index.html`,
      template,
      title,
    }),
  ],
});

/* webpack.config.js */
module.exports = mode => {
  const pages = [
    parts.page({ title: "Webpack demo" }),
    parts.page({ title: "another demo", path: "another" })
  ];

  const config = mode === "production" ? productionConfig : developmentConfig;

  return pages.map(page => merge(commonConfig, config, page, { mode }));
}

```