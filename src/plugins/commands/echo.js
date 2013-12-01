module.exports = function (cm) {
  return {
    echo: {
      exec: function (cmd, args, callback) {
        callback(args.join(' '));
      }
    }
  };
};
