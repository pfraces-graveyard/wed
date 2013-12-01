module.exports = function (wed) {
  var isActive = false;

  return {
    toggleShell: function (cm) {
      if (isActive) {
        cm.removeKeyMap(wed.keymap.shell);
        wed.shell.deactivate();
        wed.shellPanel.style.display = 'none';
      } else {
        cm.addKeyMap(wed.keymap.shell);
        wed.shell.activate();
        wed.shellPanel.style.display = 'inline';
      }

      isActive = !isActive;
    }
  };
};
