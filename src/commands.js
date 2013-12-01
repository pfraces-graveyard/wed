module.exports = function (keymap, shell, panel) {
  var commands = {};

  commands['shell.toggle'] = (function () {
    var isActive = false;

    return function (cm) {
      if (isActive) {
        cm.removeKeyMap(keymap.shell);
        shell.deactivate();
        panel.style.display = 'none';
      } else {
        cm.addKeyMap(keymap.shell);
        shell.activate();
        panel.style.display = 'inline';
      }

      isActive = !isActive;
    };
  })();
  
  commands['indent.useSpaces'] = function (cm) {
    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces, "end", "+input");
  };

  return commands;
};
