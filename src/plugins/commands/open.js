var fs = require('fs'),
    extmode = require('../../lib/extmode')

module.exports = function (wed) {
  var cm = wed.cm,
      pathCompletion = wed.path.pathCompletionHandler;

  return {
    open: {
      exec: function (cmd, args, callback) {
        var filePath = args[0],
            content = fs.readFileSync(filePath, { encoding: 'utf8' }),
            mode = extmode(filePath);

        cm.setValue(content);
        cm.setOption('mode', mode);
        callback('mode ' + mode);
      },
      completion: pathCompletion
    }
  };
};
