module.exports = function (deps) {
  var _ = deps._;

  var build = function (node, parent) {
    /**
     * if there is no parent we are at root node so initialize path to '/'
     * allowing for a cleaner starting call:
     *
     * - build(tree) from outside for starting the process
     * - build(branch, parent) from build's own recursive calls
     */
    parent = parent || { path: '/' };

    /**
     * define the current path:
     *
     * - root node path: '/'
     * - child node path: '/foo'
     *
     * as noted, only the root path has a trailing slash, however all
     * paths have a starting slash, so we can directly append a slash
     * and the current node name to the current path and  we will get
     *
     * - root node path: '//'
     * - child node path: '/foo/bar/
     *
     * the root node needs to be treated in a particular way avoiding
     * the double slash
     *
     * the root path is defined as '/' as a feedback to the user, so we
     * can use that path directly in the prompt. that is the reason for
     * this hack
     *
     * so here we are defining a parentPath variable which will have
     * something like '/foo/bar/' with starting and trailing slashes or
     * just '/' for the root
     *
     * then we could define the node path as the result of concatenating
     * parentPath and node name
     *
     * in the original code, an empty string is passed as a root path
     * and then, when the recursive process is over, the root node path
     * is modified (outside the process) with the user friendly single
     * slashed root path
     */
    var delimiter = '/',
        root = delimiter,
        parentPath = parent.path;
    
    if (parentPath !== root) {
      parentPath += delimiter;
    }

    /**
     * Generate a valid PathHandler object recursively from the starting
     * tree
     */
    parent.childnodes = _.map(node, function (child, name) {
      return build(child, {
        name: name,
        path: parentPath + name,
        parent: parent
      });
    });

    /**
     * the purpose of the this children prop is not known yet.
     * getChildNodes() uses node.childnodes defined in the PathHandler
     * object generation
     */
    parent.children = _.keys(node);

    return parent;
  }

  var fakeFs = {
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

  return build(fakeFs);
};
