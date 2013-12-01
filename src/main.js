var cfg = require('rc')('wed'),
    mix = require('u.mix'),
    dom = require('./dom')(document),
    commands = require('./commands');

(function () {

  // init josh
  var history = new Josh.History({ key: 'wed.history'}),
      shell = Josh.Shell({ history: history }),
      panel = dom('shell-panel');

  shell.onNewPrompt(function(callback) {
      callback(">");
  });
      
  panel.style.display = 'none';
  cfg.keyMap.shell.nofallthrough = true;

  // init codemirror
  var editor = dom.div();
  editor.className = 'editor';

  var cm = CodeMirror(editor, cfg.editor);
  cm.focus();
  cm.addKeyMap(cfg.keyMap.editor);

  // init commands
  var cmds = commands(cfg.keyMap, shell, panel);
  mix(cmds).in(CodeMirror.commands);

  // expose commands to the shell
  var exposed = Object.keys(cfg.shell);

  exposed.forEach(function (cmdName) {
    shell.setCommandHandler(cmdName, {
      exec: function (cmd, args, callback) {
        callback(cm.execCommand(cfg.shell[cmdName]));
      }
    });
  });
})();
