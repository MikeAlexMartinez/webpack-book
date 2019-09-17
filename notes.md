
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