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
    },
    open: {
      exec: function (cmd, args, callback) {
        var content = fs.readFileSync(args[0], { encoding: 'utf8' });
        cm.setValue(content);
        callback();
      }
    },
    save: {
      exec: function (cmd, args, callback) {
        var content = cm.getValue();
        fs.writeFileSync(args[0], content);
        callback();
      }
    }
  };
};
