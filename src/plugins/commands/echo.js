module.exports = function (wed) {
  return {
    echo: {
      exec: function (cmd, args, callback) {
        callback(args.join(' '));
      }
    }
  };
};
