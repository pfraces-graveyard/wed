var fs = require('fs');

module.exports = function (cm) {
  return {
    cat: {
      exec: function (cmd, args, callback) {
        var buffer = '';

        args.forEach(function (arg) {
          buffer += fs.readFileSync(arg);
        });

        callback(buffer);
      }
    }
  };
};
