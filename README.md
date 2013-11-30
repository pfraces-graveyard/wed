# Wed

An editor for web developers

# Pre-requisites

[node-webkit][1] provides `nw` command

# Install

    git clone https://github.com/pfraces/wed
    cd wed
    npm install

# Usage

From `wed/` folder

    nw .

# Config

**wed** uses [rc][2] which allows several config location, here is an
example:

**~/.wedrc**

```json
{
  "keyMap": {
    "Ctrl-N": "newEditor",
    "Tab": "spaceIndent"
  },
  "editor": {
    "autofocus": true,
    "indentUnit": 4
  }
}
```

## Options

*   `keyMap`

    Map [Alt-] [Shift-] [Ctrl-] key to a command name

*   `editor`

    Pass configuration directly to the editor

# Commands

## newEditor

Appends a `div.editor` into `div#canvas` with a new instance of [codemirror][3]

## spaceIndent

Adds indentation made of `config.editor.indentUnits` spaces

[1]: https://github.com/rogerwang/node-webkit
[2]: https://github.com/dominictarr/rc
[3]: https://github.com/marijnh/codemirror
