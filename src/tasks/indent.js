module.exports = function () {
  return {
    'indent.useSpaces': function (cm) {
      var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces, "end", "+input");
    }
  };
};
