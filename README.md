# Wed

An editor for web developers

# Pre-requisites

[node-webkit][1] provides `nw` command

# Install

    git clone https://github.com/pfraces/wed
    cd wed
    npm install
    bower install
    ln -s bower_components src/vendor

# Usage

From `wed/` folder

    nw .

# Config

**wed** uses [rc][2] which allows several config location, here is an
example:

    cp wedrc.example.json ~/.wedrc

**~/.wedrc**

```json
{
  "keyMap": {
    "editor": {
      "Ctrl-C": "shell.toggle",
      "Tab": "indent.useSpaces"
    },
    "shell": {
      "Ctrl-C": "shell.toggle"
    }
  },
  "shell": {
    "exit": "shell.toggle"
  },
  "editor": {
    "indentUnit": 4,
    "lineNumbers": true
  }
}
```

## Options

### `keyMap`

Map `[Shift-] [Ctrl-] [Alt-]` keys to a command name

#### `keyMap.editor`

Key bindings for the editor

#### `keyMap.shell`

This mode is available when the shell is open and prevents key events to
fallthrough child keymaps

### `shell`

Command aliases exposed in the shell

### `editor`

Pass configuration directly to the editor

# Plugins

**wed** is created with 3 basic features in mind:

1.  a glue between its core components ([CodeMirror][3], [Josh][4], ...)
2.  several plugin systems *(tasks, commands, ...)*
3.  complete configuration support

Allowing for a full customization of the user environment

## Task plugins

CodeMirror commands, shared between all CodeMirror instances

### Builtin

#### `indent.useSpaces`

Adds indentation made of `config.editor.indentUnits` spaces

#### `shell.toggle`

Shows or hides the shell

## Command plugins

Josh commands

### Builtin

#### `open *<filename>*`

Loads the content of the specified file in the editor

#### `save *<filename>*`

Stores the editor content in the specified file

# Defining plugins

Plugins are defined using [node.js][5] packaging system

## Task definition

As stated in [issue #13][6]

A *task* module constructor receives the dependencies needed and returns a commands object, which is a collection of named functions which receive a codemirror instance as unique argument

```js
module.exports = function (keymap, shell, panel) {
    return {
        'shell.toggle': function (cm) {
            ...
        }
    };
};
```

## Command definition

As stated in [issue #13][6]

A *command* module constructor receives a codemirror instance and returns a task object, which is a collection of named Josh command objects

```js
module.exports = function (cm) {
    return {
        'file.open': {
            exec: function (cmd, args, callback) {
                ...
            },
            complete: function (cmd, arg, line, callback) {
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
