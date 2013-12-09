var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      completion = wed.pathHandler.pathCompletionHandler,
      curBufPath = wed.current.path || '',
      root = wed.root,
      cwd = wed.cwd;

  return {
    save: {
      exec: function (cmd, args, callback) {
        var content = cm.getValue(),
            path,
            arg;

        if (!args.length) {
          path = curBufPath;
        } else {
          arg = args[0];

          path = [
            root(),
            arg[0] === '/' ? '' : cwd(),
            arg
          ].join('');
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
