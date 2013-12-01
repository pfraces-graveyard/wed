module.exports = function (keymap, shell, panel) {
  var isActive = false;
  return {
    'shell.toggle': function (cm) {
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
    }
  };
};
