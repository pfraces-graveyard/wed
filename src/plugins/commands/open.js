var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      pathHandler = wed.pathHandler,
      fsMode = wed.lib.fs.mode;

  var completion = pathHandler.pathCompletionHandler,
      root = process.env.PWD;

  return {
    open: {
      exec: function (cmd, args, callback) {
        var current = pathHandler.current.name || '',
            pwd = root + current;

        var arg = args[0],
            start = arg[0] === '/' ? root : pwd,
            path = start + arg,
            content = fs.readFileSync(path, { encoding: 'utf8' }),
            mode = fsMode(path);

        cm.setValue(content);
        cm.setOption('mode', mode);
        callback('mode ' + mode);
      },
      completion: completion
    }
  };
};
