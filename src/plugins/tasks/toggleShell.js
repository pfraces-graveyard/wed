module.exports = function (wed) {
  var panel = wed.lib.dom('shell-panel'),
      shell = wed.josh,
      km = wed.config.keymap;

  var isActive = false;

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
