var fs = require('fs');

module.exports = function (wed) {
  var fsCompletion = wed.josh.completions.fs;

  return {
    cat: {
      exec: function (cmd, args, callback) {
        var buffer = '';

        args.forEach(function (arg) {
          buffer += fs.readFileSync(arg);
        });

        callback(buffer);
      },
      completion: fsCompletion
    }
  };
};
