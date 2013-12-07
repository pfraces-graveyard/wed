module.exports = function (deps) {
  var fs = require('fs'),
      async = require('async'),
      _ = deps._;

  /**
   * getNode()
   *
   * ? Required by the path handler
   *   http://sdether.github.io/josh.js/docs/example.html
   *
   * > path: string
   * > callback: function ({ name: string })
   */
  var getNode = function (path, callback) {
    if(!path) {
      return callback(this.current);
    }

    var start = path[0] === '/' ? '' : (this.current.name || '') + '/';
    callback({ name: start + path });
  };

  /**
   * getChildNodes()
   *
   * ? Required by the path handler
   *   http://sdether.github.io/josh.js/docs/example.html
   *
   * > node: { name: string }
   * > callback: function ([{ name: string }])
   */
  var getChildNodes = function (node, callback) {
    var path = process.env.PWD + '/' + ((node && node.name) || '');
    console.log('path:', this.path);

    fs.readdir(path, function (err, nodes) {
      if (err || !nodes || !nodes.length) {
        return callback();
      }

      async.map(nodes.map(function (node) { 
        return path + '/' + node; 
      }), fs.stat, function (err, stats) {
        callback(stats.map(function (stats, index) {
          stats.name = nodes[index];
          return stats;
        }));
      });
    });
  };

  return {
    getNode: getNode,
    getChildNodes: getChildNodes
  };
};
