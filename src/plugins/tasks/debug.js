module.exports = function (wed) {
  var win = wed.gui.Window.get();

  return {
    debug: function (cm) {
      if (!win.isDevToolsOpen()) {
        win.showDevTools();
      }
    }
  };
};
