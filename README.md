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

    Map [Alt-] [Shift-] [Ctrl-] key with a command name

*   `editor`

    Pass configuration directly to the editor

[1]: https://github.com/rogerwang/node-webkit
[2]: https://github.com/dominictarr/rc
