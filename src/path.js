module.exports = function (_, pathhandler) {
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

  pathhandler.getNode = function (path, callback) {
    if(!path) {
      return callback(pathhandler.current);
    }

    var parts = _.filter(path.split('/'), function (x) {
      return x;
    });

    var start = ((path || '')[0] == '/') ? treeroot : pathhandler.current;
    return findNode(start, parts, callback);
  };

  pathhandler.getChildNodes = function (node, callback) {
    callback(node.childnodes);
  };
};
