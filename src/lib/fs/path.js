module.exports = function (deps) {
  var _ = deps._;

  /**
   * findNode()
   *
   * ? Find a node passed a path string like '/foo/bar' and an tree
   *   to traverse, calling a callback with the target node when it
   *   is matched
   *
   *   The tree traversal is done recursively:
   *
   *   When the first path part (foo) is found it calls itself with
   *   the rest of the parts (bar) and the current branch of the tree
   *   (tree[foo]) and so on
   *
   * > current:  current traversed node
   * > parts: array of path tokens left
   * > callback: called on each node with the node
   */
  var findNode = function (current, parts, callback) {
    
    /**
     * FINAL CASE: MATCH FOUND!
     *
     * stop recursion and call the callback with the matching node
     *
     * when there are no more tokens in the path means that the path
     * is completelly matched
     *
     * if the last token has failed it were been handled at the end of
     * the function (the other final case)
     */
    if(!parts || parts.length == 0) {
      return callback(current);
    }
    
    /**
     * with (..) tokens, continue traversal through its parent
     */
    if (parts[0] == "..") {
      current = current.parent;
    }
    
    /**
     * with (.) tokens, traverse again through the current node
     * which means that simply ignore this case and continue with
     * the next path token
     *
     * otherwise, with common tokens, check if the name of the node
     * (node.name) is in the list of its children (node.childnodes)
     */
    else if (parts[0] != ".") {
        
      /**
       * MAIN SEARCH
       *
       * _.filter returns an array with the matched node and is
       * expected to match one or none
       *
       * _.first is just a sematic way of getting the first element
       * of an array with one item
       */
      current = _.first(_.filter(current.childnodes, function(node) {
        return node.name == parts[0];
      }));
    }
    
    /**
     * FINAL CASE: NO MATCHES
     *
     * stop recursion and call the callback without arguments
     *
     * if current is falsy, it means that _.filter has returned an
     * empty array, so _.first has returned that falsy
     */
    if(!current) {
      return callback();
    }
    
    
    /**
     * finally, at this point there are tokens to traverse,
     * because the case without tokens is the first checked,
     * so lets go with recursion
     *
     * note that the first token is left out with _.rest, which
     * returns an array with all but the first items from another
     * array
     */
    return findNode(current, _.rest(parts), callback);
  };

  /**
   * getNode()
   *
   * ? Required by the path handler
   *
   * > path
   * > callback
   */
  var getNode = function (path, callback) {
    console.log(path);
    if(!path) {
      return callback(this.current);
    }

    /**
     * remove nulls ('foo/' splits in ['foo', undefined])
     *
     * using the filter(Boolean) hack from
     * http://stackoverflow.com/a/13798078/1815446
     */
    var parts = path.split('/').filter(Boolean);

    /**
     * if the path is absolute find nodes from root,
     * but if it is relative find nodes from current node
     */
    var start = path[0] == '/' ? this.root : this.current;

    return findNode(start, parts, callback);
  };

  /**
   * getChildNodes()
   *
   * ? Required by the path handler
   *
   * > node
   * > callback
   */
  var getChildNodes = function (node, callback) {
    callback(node.childnodes);
  };

  return {
    getNode: getNode,
    getChildNodes: getChildNodes
  };
};
