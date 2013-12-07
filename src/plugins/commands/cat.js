var fs = require('fs');

module.exports = function (wed) {
  var pathHandler = wed.pathHandler;

  var completion = pathHandler.pathCompletionHandler,
      root = process.env.PWD;

  return {
    cat: {
      exec: function (cmd, args, callback) {
        var current = pathHandler.current.name || '',
            pwd = root + current;

        var buffer = '';

        args.forEach(function (arg) {
          var start = arg[0] === '/' ? root : pwd,
              path = start + arg;

          buffer += fs.readFileSync(path);
        });

        callback(buffer);
      },
      completion: completion
    }
  };
};
