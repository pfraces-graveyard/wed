module.exports = function (deps) {
  var _ = deps._;

  var findNode = function (current, parts, callback) {
    if(!parts || parts.length == 0) {
      return callback(current);
    }
    if(parts[0] == ".") {

    } else if(parts[0] == "..") {
      current = current.parent;
    } else {
      current = _.first(_.filter(current.childnodes, function(node) {
        return node.name == parts[0];
      }));
    }
    if(!current) {
      return callback();
    }
    return findNode(current, _.rest(parts), callback);
  };

  var getNode = function (path, callback) {
    if(!path) {
      return callback(this.current);
    }

    var parts = _.filter(path.split('/'), function (x) {
      return x;
    });

    var start = ((path || '')[0] == '/') ?
                treeroot :
                this.current;
    
    return findNode(start, parts, callback);
  };

  var getChildNodes = function (node, callback) {
    callback(node.childnodes);
  };

  return {
    getNode: getNode,
    getChildNodes: getChildNodes
  };
};
