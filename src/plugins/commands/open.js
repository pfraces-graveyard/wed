var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      fsCompletion = wed.josh.completions.fs,
      fsMode = wed.lib.fs.mode;

  return {
    open: {
      exec: function (cmd, args, callback) {
        var path = process.env.PWD + '/' + args[0],
            content = fs.readFileSync(path, { encoding: 'utf8' }),
            mode = fsMode(path);

        cm.setValue(content);
        cm.setOption('mode', mode);
        callback('mode ' + mode);
      },
      completion: fsCompletion
    }
  };
};
