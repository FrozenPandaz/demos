module.exports = (config) => {
  return {
    ...config,
    node: {
      global: true,
      process: true
    }
  };
}
