var cfg = require('rc')('wed'),
    mix = require('u.mix'),
    dom = require('./lib/dom')(document),
    path = require('./lib/path'),
    tree = require('./lib/tree');

// init josh

var history = new Josh.History({ key: 'wed.history'}),
    shell = Josh.Shell({ history: history }),
    panel = dom('shell-panel');

shell.onNewPrompt(function(callback) {
    callback(">");
});
    
panel.style.display = 'none';
cfg.keymap.shell.nofallthrough = true;

// init path handler

var pathhandler = new Josh.PathHandler(shell);
pathhandler.current = tree(_);
path(_, pathhandler);

// init codemirror

var editor = dom.div();
editor.className = 'editor';

var cm = CodeMirror(editor, cfg.editor);
cm.focus();
cm.addKeyMap(cfg.keymap.editor);

// plugin dependency injection

var wed = {
  keymap: cfg.keymap,
  shell: shell,
  path: pathhandler,
  shellPanel: panel,
  cm: cm
};

// init task plugins

mix.apply(null, cfg.tasks.map(function (task) {
  return require('./plugins/tasks/' + task)(wed);
})).in(CodeMirror.commands);

// init command plugins

var commands = mix.apply(null, cfg.commands.map(function (command) {
  return require('./plugins/commands/' + command)(wed);
})).in();

Object.keys(commands).forEach(function (cmdName) {
  shell.setCommandHandler(cmdName, commands[cmdName]);
});
