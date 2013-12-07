var gui = require('nw.gui'),
    config = require('rc')('wed'),
    mix = require('u.mix'),
    Lib = require('./lib/lib');

var lib = Lib({
  document: document,
  _: _
});

var dom = lib.dom,
    fsPathHandler = lib.fs.path,
    fsTree = lib.fs.tree;

// init josh

var history = new Josh.History({ key: 'wed.history'}),
    shell = Josh.Shell({ history: history }),
    panel = dom('shell-panel');
    
panel.style.display = 'none';
config.keymap.shell.nofallthrough = true;

// init path handler

/**
 * An initial node resolves lots of problems and checks in path handling
 * functions getNode() and getChildNodes() as in the prompt handler
 * defined below
 */
var root = {
  current: {
    path: '/',
    name: ''
  }
};

var pathHandler = mix(fsPathHandler, root)
		.in(new Josh.PathHandler(shell));

// init prompt

shell.onNewPrompt(function (callback) {
  var path = '/' + pathHandler.current.path
          .split('/').filter(Boolean).join('/');

  callback(path + '>');
});

// init codemirror

var editor = dom.div();
editor.className = 'editor';

var cm = CodeMirror(editor, config.editor);
cm.focus();
cm.addKeyMap(config.keymap.editor);

// plugin dependency injection

var wed = {
  gui: gui,
  codemirror: cm,
  josh: shell,
  pathHandler: pathHandler,
  lib: lib,
  config: config
};

// init task plugins

mix.apply(null, config.tasks.map(function (task) {
  return require('./plugins/tasks/' + task)(wed);
})).in(CodeMirror.commands);

// init command plugins and handle possible errors to prevent
// prompt crashes (#25)

var commands = mix.apply(null, config.commands.map(function (command) {
  return require('./plugins/commands/' + command)(wed);
})).in();

Object.keys(commands).forEach(function (cmdName) {
  shell.setCommandHandler(cmdName, {
      exec: function (cmd, args, callback) {
        try {
          commands[cmdName].exec.apply(this, arguments);
        } catch (e) {
          callback(e);
        }
      },
      completion: commands[cmdName].completion
  });
});
