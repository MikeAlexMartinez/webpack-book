const cache = new Map();

module.exports = function(context) {
  // Calls only once for given resource path
  const callbacks = cache.get(this.resourcePath);
  callbacks.forEach(callback => callback(null, content));

  cache.set(this.resourcePath, content);

  return content;
};

module.exports.pitch = function() {
  if (cache.has(this.resourcePath)) {
    const item = cache.get(this.resourcePath);

    if (item instanceof Array) {
      item.push(this.async());
    } else {
      // Hit cache
      return item;
    }
  } else {
    cache.set(this.resourcePath, []);
  }
}