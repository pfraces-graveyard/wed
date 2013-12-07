# Wed

An editor for web developers

# Pre-requisites

[node-webkit][1] provides `nw` command

# Install

    git clone https://github.com/pfraces/wed
    cd wed
    npm install
    bower install

Link your `bower_components` directory to `src/vendor`

    ln -s bower_components src/vendor

If the previous doesn't work in your system, copy the components

    cp -R bower_components src/vendor

Keep in mind to do this copy again if you update with `bower update`

# Launching the app

From `wed/` folder

    nw .

A start script is also provided. You can call it from everywhere by
linking it to some path in `$PATH`

    ln -s /path/to/wed/start.sh ~/bin/wed

In the previous example we have renamed the start script to `wed`

Called without paramenters, `wed` launches the editor detached from the
console and supressing node-webkit's outuput

    cd /path/to/a/project
    wed

A debug flag is supported which keeps the editor attached to the
console and shows the node-webkit's output

    wed --debug

# Config

**wed** uses [rc][2] which allows several config locations. You can use
the provided example configuration file as a starting point

    cp wedrc.example.json ~/.wedrc

## Options

### `tasks`

```json
{
  "tasks": [
    "tabsToSpaces",
    "toggleShell",
    "debug"
  ]
}
```

An array of tasks to be exposed in the editor.

Each task is a string with the task path to be used by `require`, relative
to `plugins/tasks/` directory

### `commands`

```json
{
  "commands": [
    "echo",
    "cat",
    "open",
    "save"
  ]
}
```

An array of commands to be exposed in the shell.

Each command is a string with the command path to be used by `require`,
relative to `plugins/commands/` directory

### `keymap`

```json
{
  "keymap": {
    "editor": { ... },
    "shell": { ... }
  }
}
```

A collection of named keymaps each being a map of
`[Shift-] [Ctrl-] [Alt-] keyName` keys to task names

#### `keymap.editor`

```json
{
  "keymap": {
    "editor": {
      "Ctrl-C": "shell.toggle",
      "Ctrl-D: "debug",
      "Tab": "indent.useSpaces"
    }
  }
}
```

This keymap is enabled by default

[builtin CodeMirror keymap][11]

#### `keymap.shell`

```json
{
  "keymap": {
    "shell": {
      "Ctrl-C": "shell.toggle"
    }
  }
}
```

This keymap is enabled when the shell is open and disables the editor
keymap

### `editor`

```json
{
  "editor": {
    "indentUnit": 4,
    "lineNumbers": true
  }
}
```

[Pass configuration directly to CodeMirror][9]

# Plugins

**wed** is created with 3 basic features in mind:

1.  a glue between its core components ([CodeMirror][3], [Josh][4], ...)
2.  several plugin systems *(tasks, commands, ...)*
3.  complete configuration support

Allowing for a full customization of the user environment

## Task plugins

CodeMirror commands, shared between all CodeMirror instances

>   The values of properties in keymaps can be either functions of a
    single argument (the CodeMirror instance), strings, or false. Such
    strings refer to properties of the CodeMirror.commands object, which
    defines a number of common commands that are used by the default
    keybindings, and maps them to functions.

[CodeMirror manual][10]

### Builtin

#### `tabsToSpaces`

Adds indentation made of `config.editor.indentUnits` spaces

#### `toggleShell`

Shows or hides the shell

## Command plugins

Josh commands

[In the Josh hello world exmple][12] its explained how to define commands

### Builtin

#### `open <filename>`

Loads the content of the specified file in the editor

Autodetects file content by extension and loads the appropiate CodeMirror
syntax highlighter (called **mode** by CodeMirror)

Builtin supported modes:

*   html
*   css
*   js

References: [htmlmixed mode][7], [switching modes][8]

#### `save <filename>`

Stores the editor content in the specified file

#### `cat <filename>`

Shows the content of the specified file in the shell

#### `echo`

Outputs its arguments

# Defining plugins

Plugins are defined using [node.js][5] packaging system

[API discussion here][6]

Plugins receive a `wed` object which is a collection of useful
dependencies defined in `src/main.js`

```js
var wed = {
  gui: gui,
  codemirror: cm,
  josh: {
    shell: shell,
    completions: {
      fs: pathhandler.pathCompletionHandler
    }
  },
  lib: lib,
  config: config
};
```

## Task definition

A *task* module constructor receives a `wed` object and returns a
commands object, which is a collection of named functions which receive a
codemirror instance as unique argument

```js
module.exports = function (wed) {
    return {
        'taskName': function (cm) {
            ...
        }
    };
};
```

## Command definition

A *command* module constructor receives a `wed` object and returns
a task object, which is a collection of named Josh command objects

```js
module.exports = function (wed) {
    return {
        'commandName': {
            exec: function (cmd, args, callback) {
                ...
            },
            complete: function (cmd, arg, line, callback) {
                ...
            }
        }
    };
};
```

[1]: https://github.com/rogerwang/node-webkit
[2]: https://github.com/dominictarr/rc
[3]: https://github.com/marijnh/codemirror
[4]: https://github.com/sdether/josh.js
[5]: https://github.com/joyent/node
[6]: https://github.com/pfraces/wed/issues/13
[7]: http://codemirror.net/mode/htmlmixed/index.html
[8]: http://codemirror.net/demo/changemode.html
[9]: http://codemirror.net/doc/manual.html#config
[10]: http://codemirror.net/doc/manual.html
[11]: https://github.com/marijnh/CodeMirror/blob/master/lib/codemirror.js#L3560
[12]: http://sdether.github.io/josh.js/helloworld.html
