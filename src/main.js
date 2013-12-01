var cfg = require('rc')('wed'),
    mix = require('u.mix'),
    dom = require('./dom')(document);

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

// init tasks
mix(
  require('./tasks/indent')(),
  require('./tasks/shell')(cfg.keyMap, shell, panel)
).in(CodeMirror.commands);

// wrap tasks in commands as defined in config
Object.keys(cfg.shell).forEach(function (task) {
  shell.setCommandHandler(task, {
    exec: function (cmd, args, callback) {
      callback(cm.execCommand(cfg.shell[task]));
    }
  });
});

// init commands
var commands = mix(
      require('./commands/echo')(cm),
      require('./commands/file')(cm)
    ).in();

Object.keys(commands).forEach(function (cmdName) {
  shell.setCommandHandler(cmdName, commands[cmdName]);
});
