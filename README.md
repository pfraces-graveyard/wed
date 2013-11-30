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
    "Ctrl-N": "newEditor",
    "Ctrl-C": "toggleShell",
    "Tab": "spaceIndent"
  },
  "editor": {
    "autofocus": true,
    "indentUnit": 4,
    "lineNumbers": true
  }
}
```

## Options

*   `keyMap`

    Map [Alt-] [Shift-] [Ctrl-] key with a command name

*   `editor`

    Pass configuration directly to the editor

[1]: https://github.com/rogerwang/node-webkit
[2]: https://github.com/dominictarr/rc
