var config = require('rc')('wed');

// DOM helpers

var el = document.getElementById.bind(document),
    $ = document.querySelectorAll.bind(document);

var div = function () {
  var d = document.createElement('div');
  return el('canvas').appendChild(d);
};

// available commands

var commands = {};

commands.newEditor = function () {
  var editor = div();
  editor.className = 'editor';
  CodeMirror(editor, config.editor);
};

commands.toggleShell = (function () {
  var history = new Josh.History({ key: 'wed.history'}),
      shell = Josh.Shell({ history: history }),
      panel = el('shell-panel'),
      isActive = false;

  panel.style.display = 'none';

  shell.onNewPrompt(function(callback) {
      callback(">");
  });

  return function () {
    if (isActive) {
      shell.deactivate();
      panel.style.display = 'none';
    } else {
      shell.activate();
      panel.style.display = 'inline';
    }

    isActive = !isActive;
  };
})();

commands.spaceIndent = function (cm) {
  var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
  cm.replaceSelection(spaces, "end", "+input");
};

// init

config.editor = config.editor || {};
config.editor.extraKeys = config.editor.extraKeys || {};

Object.keys(config.keyMap).forEach(function (key) {
  config.editor.extraKeys[key] = commands[config.keyMap[key]];
});

commands.newEditor();
