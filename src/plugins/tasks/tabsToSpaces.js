module.exports = function (wed) {
  return {
    tabsToSpaces: function (cm) {
      var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces, "end", "+input");
    }
  };
};
