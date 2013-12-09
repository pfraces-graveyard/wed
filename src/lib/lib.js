module.exports = function (deps) {
  return {
    dom:    require('./dom')(deps),
    fs: {
      mode: require('./fs/mode')(deps),
      pathHandler: require('./fs/path-handler')(deps)
    }
  };
};
