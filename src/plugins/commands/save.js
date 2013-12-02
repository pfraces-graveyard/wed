var fs = require('fs');

module.exports = function (wed) {
  return {
    save: {
      exec: function (cmd, args, callback) {
        var content = wed.cm.getValue();
        fs.writeFileSync(args[0], content);
        callback();
      },
      completion: wed.path.pathCompletionHandlerHandler
    }
  };
};
