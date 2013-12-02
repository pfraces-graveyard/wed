module.exports = function (_) {
  var fakeFs = {
    'README.md': {},
    'bower.json': {},
    'package.json': {},
    'src': {
      'index.html': {},
      'lib': {
        'dom.js': {},
        'josh': {
          'LICENSE': {},
          'README.md': {},
          'history.js': {},
          'killring.js': {},
          'pathhandler.js': {},
          'readline.js': {},
          'shell.js': {}
        },
        'path.js': {},
        'tree.js': {}
      },
      'main.js': {},
      'plugins': {
        'commands': {
          'cat.js': {},
          'echo.js': {},
          'open.js': {},
          'save.js': {}
        },
        'tasks': {
          'tabsToSpaces.js': {},
          'toggleShell.js': {}
        }
      },
      'style.css': {}
    },
    'wedrc.example.json': {}
  };

  var build = function (parent, node) {
    parent.childnodes = _.map(_.pairs(node), function (pair) {
      var child = {
        name: pair[0],
        path: parent.path + "/" + pair[0],
        parent: parent
      };
      build(child, pair[1]);
      return child;
    });
    parent.children = _.keys(node);
    return parent;
  }

  var tree = build({name: "", path: ""}, fakeFs);
  tree.path = '/';
  return tree;
};
