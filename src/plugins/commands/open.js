var fs = require('fs');

module.exports = function (wed) {
  var cm = wed.codemirror,
      completion = wed.pathHandler.pathCompletionHandler,
      root = wed.root,
      cwd = wed.cwd,
      fsMode = wed.lib.fs.mode;

  return {
    open: {
      exec: function (cmd, args, callback) {
        var arg = args[0];

        path = [
          root(),
          arg[0] === '/' ? '' : cwd(),
          arg
        ].join('');
        
        var content = fs.readFileSync(path, { encoding: 'utf8' }),
            mode = fsMode(path) || {},
            modeConf = mode.mode,
            modeName = mode.name;

        cm.setValue(content);
        cm.setOption('mode', modeConf);
        callback('mode ' + modeName);
      },
      completion: completion
    }
  };
};
