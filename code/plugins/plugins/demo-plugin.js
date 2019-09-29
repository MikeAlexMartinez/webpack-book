const { RawSource } = require('webpack-sources');

module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options;
  }
  /**
   * @param {import('webpack').compiler} compiler
   */
  apply(compiler) {
    const { name } = this.options;

    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets[name] = new RawSource('demo');

      cb();
    });
  }
}