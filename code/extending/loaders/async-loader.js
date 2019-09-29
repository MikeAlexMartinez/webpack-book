module.exports = function(input) {
  const callback = this.async();

  // no callback -> return synchronous results
  // if (callback) { ... }

  callback(null, input + input);
};
