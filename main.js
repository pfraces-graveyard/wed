var config = require('rc')('wed');

var editor = document.getElementById('editor');

var commands = {
  spaceIndent: function (cm) {
    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces, "end", "+input");
  }
};

var editorConf = config.editor || {},
    extraKeys = editorConf.extraKeys = editorConf.extraKeys || {},
    km = config.keyMap || {};


Object.keys(km).forEach(function (key) {
  extraKeys[key] = commands[km[key]];
});

var cm = CodeMirror(editor, editorConf);
