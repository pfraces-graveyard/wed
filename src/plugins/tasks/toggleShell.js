module.exports = function (wed) {
  var isActive = false,
      panel = wed.lib.dom('shell-panel'),
      shell = wed.josh.shell,
      km = wed.config.keymap;

  return {
    toggleShell: function (cm) {
      if (isActive) {
        cm.removeKeyMap(km.shell);
        shell.deactivate();
        panel.style.display = 'none';
      } else {
        cm.addKeyMap(km.shell);
        shell.activate();
        panel.style.display = 'inline';
      }

      isActive = !isActive;
    }
  };
};
