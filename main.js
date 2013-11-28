var config = require('rc')('wed');

var editor = document.getElementById('editor');
var cm = CodeMirror(editor, config.codemirror);
