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
cfg.keymap.shell.nofallthrough = true;

// init codemirror
var editor = dom.div();
editor.className = 'editor';

var cm = CodeMirror(editor, cfg.editor);
cm.focus();
cm.addKeyMap(cfg.keymap.editor);

// init tasks

var wed = {
  keymap: cfg.keymap,
  shell: shell,
  shellPanel: panel
};

mix.apply(null, cfg.tasks.map(function (task) {
  return require('./plugins/tasks/' + task)(wed);
})).in(CodeMirror.commands);

// init commands

var commands = mix.apply(null, cfg.commands.map(function (command) {
  return require('./plugins/commands/' + command)(cm);
})).in();

Object.keys(commands).forEach(function (cmdName) {
  shell.setCommandHandler(cmdName, commands[cmdName]);
});
