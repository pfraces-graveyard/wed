var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      pathHandler = wed.pathHandler;
      
  var completion = pathHandler.pathCompletionHandler,
      root = process.env.PWD;

  return {
    save: {
      exec: function (cmd, args, callback) {
        var current = pathHandler.current.name || '',
            pwd = root + current;

        var arg = args[0],
            start = arg[0] === '/' ? root : pwd,
            path = start + arg,
            content = cm.getValue();

        fs.writeFileSync(path, content);
        callback();
      },
      completion: completion
    }
  };
};
