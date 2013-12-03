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
     * - root path: '/'
     * - no root path: '/foo'
     *
     * as noted, only the root path has an ending '/', however all paths
     * have a starting '/', so we can directly append '/' and the current
     * node name to the current path and in order to prevent from paths
     * starting with `//` the root case must be treated as if it was ''.
     *
     * The root path is defined as '/' as a feedback to the user, so we
     * can use that path directly in the prompt and that is the reason
     * for this hack
     *
     * so here we are defining a parentPath variable which will have the
     * something like '/foo/bar/' with starting and trailing slashes
     *
     * then we could define the node path as the result of concatenating
     * parentPath and node name
     */
    var parentPath = parent.path + parent.path === '/' ? '' : '/';

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
