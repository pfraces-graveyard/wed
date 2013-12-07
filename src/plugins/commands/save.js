var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      pathHandler = wed.pathHandler,
      currPath = wed.current.path || '';
      
  var completion = pathHandler.pathCompletionHandler,
      root = process.env.PWD;

  return {
    save: {
      exec: function (cmd, args, callback) {
        var path,
            content = cm.getValue();

        if (!args.length) {
          path = currPath;
        } else {
          var current = pathHandler.current.path,
              pwd = root + current,
              arg = args[0],
              start = arg[0] === '/' ? root : pwd;

          path = start + arg;
        }

        if (!path) {
          return callback('err: unnamed files cannot be saved');
        }

        fs.writeFileSync(path, content);
        callback();
      },
      completion: completion
    }
  };
};
