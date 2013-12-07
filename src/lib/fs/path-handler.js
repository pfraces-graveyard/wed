module.exports = function (deps) {
  var fs = require('fs'),
      fsPath = require('path'),
      async = require('async'),
      _ = deps._;

  /**
   * getNode()
   *
   * ? Required by the path handler
   *   http://sdether.github.io/josh.js/docs/example.html
   *
   *   Native Josh prompt and pwd templates expect a node with a path
   *   property.
   *
   *   While using them, getNode() and getChildNodes must provide both a name
   *   and path properties
   *
   *   node: {
   *     name: node name without its path,
   *     path: absolute path to node including name
   *   }
   *
   * > path: either absolute or relative path to node
   * > callback: function (node)
   */
  var getNode = function (path, callback) {
    var current = this.current;

    if(!path) {
      return callback(current);
    }

    var start = path[0] === '/' ? '' : current.path,
        abs = fsPath.normalize(start + path);

    fs.stat(process.env.PWD + abs, function (err, stat) {
      if (err) {
        return callback();
      }

      if (stat.isDirectory() && abs[abs.length - 1] !== '/') {
        abs += '/';
      }

      callback({
        name: fsPath.basename(abs),
        path: abs
      });
    });
  };

  /**
   * getChildNodes()
   *
   * ? Required by the path handler
   *   http://sdether.github.io/josh.js/docs/example.html
   *
   *   Native Josh prompt and pwd templates expect a node with a path
   *   property.
   *
   *   While using them, getNode() and getChildNodes must provide both a name
   *   and path properties
   *
   *   node: {
   *     name: node name without its path,
   *     path: absolute path to node including name
   *   }
   *
   *   Proposal:
   *
   *   Seems like getNode gets a path and returns a node object.
   *   getChildNodes() however gets a node and returns an array of nodes
   *
   *   This causes to duplicate the code to get the stats of the node.
   *   
   *   getChildNodes() could return just an array of paths and resolve
   *   each path with getNode()
   *
   *   This proposal require hacking into Josh's pathhandler lib
   *
   * > node: node
   * > callback: function ([node])
   */
  var getChildNodes = function (node, callback) {
    var path = process.env.PWD + node.path;

    fs.readdir(path, function (err, nodes) {
      if (err || !nodes || !nodes.length) {
        return callback();
      }

      nodes.unshift('..');

      async.map(nodes.map(function (node) { 
        return path + node; 
      }), fs.stat, function (err, stats) {
        callback(stats.map(function (nodeStats, nodeIndex) {
          nodeStats = nodeStats || {};
          node = nodes[nodeIndex];

          nodeStats.path = node;
          nodeStats.name = fsPath.basename(node);

          return nodeStats;
        }));
      });
    });
  };

  return {
    getNode: getNode,
    getChildNodes: getChildNodes
  };
};
