var cfg = require('rc')('wed'),
    dom = require('./dom')(document),
    cmd = require('./commands')(cfg, dom, CodeMirror, Josh);

cmd['editor.new']();
