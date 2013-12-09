var fs = require('fs');

module.exports = function (wed) {
  var completion = wed.pathHandler.pathCompletionHandler,
      root = wed.root,
      cwd = wed.cwd;

  return {
    cat: {
      exec: function (cmd, args, callback) {
        var buffer = '';

        args.forEach(function (arg) {
          var path =  [
            root(),
            arg[0] === '/' ? '' : cwd(),
            arg
          ].join('');

          buffer += fs.readFileSync(path);
        });

        callback(buffer);
      },
      completion: completion
    }
  };
};
