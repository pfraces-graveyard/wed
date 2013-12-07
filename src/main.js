var gui = require('nw.gui'),
    config = require('rc')('wed'),
    mix = require('u.mix'),
    Lib = require('./lib/lib'),
    fs = require('fs');

var lib = Lib({
  document: document,
  _: _
});

var dom = lib.dom,
    fsPathHandler = lib.fs.pathHandler,
    fsMode = lib.fs.mode;

// # init josh

var history = new Josh.History({ key: 'wed.history'}),
    shell = Josh.Shell({ history: history }),
    panel = dom('shell-panel');
    
panel.style.display = 'none';
config.keymap.shell.nofallthrough = true;

// ## init path handler

/**
 * An initial node resolves lots of problems and checks in path handling
 * functions getNode() and getChildNodes() as in the prompt handler
 * defined below
 */
var root = {
  path: '/',
  name: ''
};

var pathHandler = mix(fsPathHandler, { current: root })
		.in(new Josh.PathHandler(shell));

// ## init prompt

shell.onNewPrompt(function (callback) {
  var path = '/' + pathHandler.current.path
          .split('/').filter(Boolean).join('/');

  callback(path + '>');
});

// # init codemirror

var editor = dom.div();
editor.className = 'editor';

var cm = CodeMirror(editor, config.editor);
cm.focus();
cm.addKeyMap(config.keymap.editor);

// ## open file from command line

var args = gui.App.argv;

if (args.length) {
  var arg = args[0],
      start = arg[0] === '/' ? '' : process.env.PWD,
      path = start + '/' + arg,
      content = fs.readFileSync(path, { encoding: 'utf8' }),
      mode = fsMode(path);

  cm.setValue(content);
  cm.setOption('mode', mode);
}

// # plugins

// ## plugin dependency injection

var wed = {
  gui: gui,
  codemirror: cm,
  josh: shell,
  pathHandler: pathHandler,
  lib: lib,
  config: config
};

// ## init task plugins

mix.apply(null, config.tasks.map(function (task) {
  return require('./plugins/tasks/' + task)(wed);
})).in(CodeMirror.commands);

// ## init command plugins

var commands = mix.apply(null, config.commands.map(function (command) {
  return require('./plugins/commands/' + command)(wed);
})).in();

Object.keys(commands).forEach(function (cmdName) {
  var command = commands[cmdName];

  // (#25) handle possible errors to prevent prompt crashes
  shell.setCommandHandler(cmdName, {
      exec: function (cmd, args, callback) {
        try {
          command.exec.apply(this, arguments);
        } catch (e) {
          callback(e);
        }
      },
      completion: command.completion
  });
});
