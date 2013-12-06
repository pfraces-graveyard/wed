module.exports = function (deps) {
  return {
    dom:    require('./dom')(deps),
    fs: {
      mode: require('./fs/mode')(deps),
      path: require('./fs/path')(deps)
    }
  };
};
