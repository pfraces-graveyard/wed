var fs = require('fs');

module.exports = function (cm) {
  return {
    open: {
      exec: function (cmd, args, callback) {
        var content = fs.readFileSync(args[0], { encoding: 'utf8' });
        cm.setValue(content);
        callback();
      }
    }
  };
};
