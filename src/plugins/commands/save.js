var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      fsCompletion = wed.josh.completions.fs;

  return {
    save: {
      exec: function (cmd, args, callback) {
        var path = process.env.PWD + '/' + args[0],
            content = cm.getValue();

        fs.writeFileSync(path, content);
        callback();
      },
      completion: fsCompletion
    }
  };
};
