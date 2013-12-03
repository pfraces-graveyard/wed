var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      fsCompletion = wed.josh.completions.fs;

  return {
    save: {
      exec: function (cmd, args, callback) {
        var content = cm.getValue();
        fs.writeFileSync(args[0], content);
        callback();
      },
      completion: fsCompletion
    }
  };
};
