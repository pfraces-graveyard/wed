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

### `editor`

Pass configuration directly to the editor

# Commands

## `editor.new`

Appends a `div.editor` into `div#canvas` with a new instance of
[codemirror][3]

## `indent.useSpaces`

Adds indentation made of `config.editor.indentUnits` spaces

## `shell.toggle`

Shows or hides the shell

[1]: https://github.com/rogerwang/node-webkit
[2]: https://github.com/dominictarr/rc
[3]: https://github.com/marijnh/codemirror
