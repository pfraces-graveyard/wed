/* ------------------------------------------------------------------------*
 * Copyright 2013 Arne F. Claassen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *-------------------------------------------------------------------------*/

var Josh = Josh || {};

(function (root, $, _) {
  Josh.PathHandler = function (shell, config) {
    // not used yet
    config = config || {};
      
    shell.templates.not_found = _.template("<div><%=cmd%>: <%=path%>: No such file or directory</div>");
    shell.templates.ls = _.template("<div><% _.each(nodes, function(node) { %><span><%=node.name%>&nbsp;</span><% }); %></div>");
    shell.templates.pwd = _.template("<div><%=node.path %>&nbsp;</div>");
      
    var self = {
      current: null,
      pathCompletionHandler: pathCompletionHandler,
      dirCompletionHandler: dirCompletionHandler
    };

    shell.setCommandHandler ("ls", {
      exec: ls,
      completion: pathCompletionHandler
    });
                  
    shell.setCommandHandler ("pwd", {
      exec: pwd
    });
                  
    shell.setCommandHandler ("cd", {
      exec: cd,
      completion: dirCompletionHandler
    });
    
    var createPathCompletionHandler = function (completeChildren) {
      return function (cmd, arg, line, callback) {
        if (!arg) {
          return completeChildren(self.current, '', callback);
        }
        
        if (arg[arg.length - 1] === '/') {
          return self.getNode(arg, function (node) {
            if (!node) {
              return callback();
            }
              
            return completeChildren(node, '', callback);
          });
        }
            
        var lastPathSeparator = arg.lastIndexOf("/");
        var parent = arg.substr(0, lastPathSeparator + 1);
        var partial = arg.substr(lastPathSeparator + 1);

        return self.getNode(parent, function (node) {
          if(!node) {
            return callback();
          }
            
          return completeChildren(node, partial, function (completion) {
            return callback(completion);
          });
        });
      };
    };

    var pathFilter = function (children) {
      return children.map(function (child) {
        var name = child.name;

        if (child.isDirectory()) {
          name += '/';
        }

        return name;
      });
    };

    var dirFilter = function (children) {
      return pathFilter(children).filter(function (child) {
        return child.isDirectory();
      });
    };

    var createChildrenCompletion = function (childrenFilter) { 
      return function (node, partial, callback) {
        self.getChildNodes(node, function (childNodes) {
          callback(shell.bestMatch(partial, childrenFilter));
        });
      };
    };

    var completePaths = createChildrenCompletion(pathFilter),
        completeDirs = createChildrenCompletion(dirFilter);

    var pathCompletionHandler = createPathCompletionHandler(completePaths),
        dirCompletionHandler = createPathCompletionHandler(completeDirs);

    var cd = function (cmd, args, callback) {
      // when called without args redirect to root
      if (!(args && args.length)) {
        args = ['/'];
      }

      self.getNode(args[0], function(node) {
        if(!node) {
          return callback(shell.templates.not_found({ cmd: 'cd', path: args[0] }));
        }

        self.current = node;
        return callback();
      });
    };

    var pwd = function (cmd, args, callback) {
      callback(shell.templates.pwd({ node: self.current }));
    };

    var ls = function (cmd, args, callback) {
      if(!args || !args[0]) {
        return render_ls(self.current, self.current.path, callback);
      }
      
      return self.getNode(args[0], function (node) {
        render_ls(node, args[0], callback);
      });
    };

    var render_ls = function (node, path, callback) {
      if(!node) {
        return callback(shell.templates.not_found({ cmd: 'ls', path: path }));
      }
        
      return self.getChildNodes(node, function (children) {
        callback(shell.templates.ls({ nodes: children }));
      });
    };

    return self;
  };
})(this, $, _);
