module.exports = function (_) {
  var fakeFs = {
    bin: {},
    boot: {},
    dev: {},
    etc: {
      default: {},
      'rc.d': {},
      sysconfig: {},
      x11: {}
    },
    home: {
      bob: {
        video: {
          'firefly.m4v': {}
        },
        videos: {
          'Arrested Development': {
            's1e1.m4v': {}
          },
          'Better Off Ted': {
            's1e1.m4v': {}
          }
        }
      },
      jane: {}
    },
    lib: {},
    'lost+found': {},
    misc: {},
    mnt: {
      cdrom: {},
      sysimage: {}
    }
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
