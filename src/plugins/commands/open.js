var fs = require('fs');

module.exports = function (wed) {
  return {
    open: {
      exec: function (cmd, args, callback) {
        var content = fs.readFileSync(args[0], { encoding: 'utf8' });
        wed.cm.setValue(content);
        callback();
      },
      completion: wed.path.pathCompletionHandler
    }
  };
};
