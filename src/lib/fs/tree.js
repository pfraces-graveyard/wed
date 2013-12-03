module.exports = function (deps) {
  var _ = deps._;

  var build = function (node, parent) {
    parent.childnodes = _.map(node, function (child, name) {
      return build(child, {
        name: name,
        path: parent.path + "/" + name,
        parent: parent
      });
    });

    parent.children = _.keys(node);
    return parent;
  }

  var fakeFs = function () {
    return {
      'README.md': {},
      'bower.json': {},
      'package.json': {},
      'src': {
        'index.html': {},
        'lib': {
          'dom.js': {},
          'fs': {
            'mode.js': {},
            'path.js': {},
            'tree.js': {}
          },
          'lib.js': {}
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
            'debug.js': {},
            'tabsToSpaces.js': {},
            'toggleShell.js': {}
          }
        },
        'style.css': {}
      },
      'wedrc.example.json': {}
    };
  };

  var tree = build(fakeFs(), { path: '/' });
  return tree;
};
