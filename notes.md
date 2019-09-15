
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

