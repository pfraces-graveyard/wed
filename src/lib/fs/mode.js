var path = require('path');

module.exports = function (deps) {
  var modes = {
    js: { name: 'JavaScript', mode: 'javascript' },
    json: { name: 'JSON', mode: { name: 'javascript', json: true } },
    css: { name: 'CSS', mode: 'css' },
    html: { name: 'HTML', mode: 'htmlmixed' }
  };

  return function (fileName) {
    var ext = path.extname(fileName).slice(1);
    return modes[ext];
  };
}
