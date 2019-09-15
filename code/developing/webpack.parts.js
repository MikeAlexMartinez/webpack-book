exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'error-only',
    host,
    port,
    open: true,
    overlay: true,
  },
});
