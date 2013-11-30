module.exports = function (config, $, codemirror, josh) {
  var cmd = codemirror.commands;

  cmd['editor.new'] = function () {
    var editor = $.div();
    editor.className = 'editor';

    var cm = codemirror(editor, config.editor);
    cm.focus();
    cm.addKeyMap(config.keyMap.editor);
  };

  cmd['shell.toggle'] = (function () {
    var history = new josh.History({ key: 'wed.history'}),
        shell = josh.Shell({ history: history }),
        panel = $('shell-panel'),
        isActive = false;

    config.keyMap.shell.nofallthrough = true;
    panel.style.display = 'none';

    shell.onNewPrompt(function(callback) {
        callback(">");
    });

    return function (cm) {
      if (isActive) {
        cm.removeKeyMap(config.keyMap.shell);
        shell.deactivate();
        panel.style.display = 'none';
      } else {
        cm.addKeyMap(config.keyMap.shell);
        shell.activate();
        panel.style.display = 'inline';
      }

      isActive = !isActive;
    };
  })();
  
  cmd['indent.useSpaces'] = function (cm) {
    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces, "end", "+input");
  };

  return cmd;
};
