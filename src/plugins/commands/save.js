var fs = require('fs');

module.exports = function (cm) {
  return {
    save: {
      exec: function (cmd, args, callback) {
        var content = cm.getValue();
        fs.writeFileSync(args[0], content);
        callback();
      }
    }
  };
};
