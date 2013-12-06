var fs = require('fs');

module.exports = function (wed) {
  var fsCompletion = wed.josh.completions.fs;

  return {
    cat: {
      exec: function (cmd, args, callback) {
        var pwd = process.env.PWD + '/',
            buffer = '';

        args.forEach(function (arg) {
          buffer += fs.readFileSync(pwd + arg);
        });

        callback(buffer);
      },
      completion: fsCompletion
    }
  };
};
