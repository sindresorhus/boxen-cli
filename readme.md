# boxen-cli

> Create boxes in the terminal

<img src="https://github.com/sindresorhus/boxen/blob/main/screenshot.png">

## Install

```sh
npm install --global boxen-cli
```

## Usage

```
$ boxen --help

  Usage
    $ boxen <string>
    $ echo <string> | boxen

  Options
    --border-color      Color of the box border [black|red|green|yellow|blue|magenta|cyan|white|gray]
    --background-color  Color of the background [black|red|green|yellow|blue|magenta|cyan|white]
    --border-style      Style of the box border [single|double|round|singleDouble|doubleSingle|classic]
                        Can also be specified as the characters to use. See below example.
    --dim-border        Reduce opacity of border
    --padding           Space between the text and box border
    --margin            Space around the box
    --center            Center the box
    --align             Align the text [left|center|right] (Default: left)
    --title             Display a title at the top of the box.
	  --title-alignment   Align the title in the top bar [left|center|right].
	  --width             Set a fixed width for the box
	  --height            Set a fixed height for the box
	  --fullscreen        Fit all available space within the terminal.

  Examples
    $ boxen I ❤ unicorns
    ┌────────────┐
    │I ❤ unicorns│
    └────────────┘

    $ boxen --border-style=doubleSingle …like everyone
    ╒══════════════╕
    │…like everyone│
    ╘══════════════╛

    $ boxen --border-style='1234-~|║' ASCII ftw!
    1----------2
    |ASCII ftw!║
    3~~~~~~~~~~4
```

## Related

- [boxen](https://github.com/sindresorhus/boxen) - API for this module
