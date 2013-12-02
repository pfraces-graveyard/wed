module.exports = function () {
  return {
    echo: {
      exec: function (cmd, args, callback) {
        callback(args.join(' '));
      }
    }
  };
};
