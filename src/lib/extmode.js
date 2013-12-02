var path = require('path');

module.exports = function (fileName) {
    var ext = path.extname(fileName);

    if (ext === '.js') return 'javascript';
    else if (ext === '.css') return 'css';
    else if (ext === '.html') return 'htmlmixed';
}
