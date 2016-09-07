# boxen-cli [![Build Status](https://travis-ci.org/sindresorhus/boxen-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/boxen-cli)

> Create boxes in the terminal

<img src="https://github.com/sindresorhus/boxen/blob/master/screenshot.png" width="300">


## Install

```
$ npm install --global boxen-cli
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
    --border-style      Style of the box border [single|double|round|single-double|double-single|classic]
                        Can also be specified as the characters to use. See below example.
    --dim-border        Reduce opacity of border
    --padding           Space between the text and box border
    --margin            Space around the box
    --center            Center the box
    --right             Align the box to the right
    --align             Align the text [left|center|right] (Default: left)

  Examples
    $ boxen I ❤ unicorns
    ┌────────────┐
    │I ❤ unicorns│
    └────────────┘

    $ boxen --border-style=double-single …like everyone
    ╒══════════════╕
    │…like everyone│
    ╘══════════════╛

    $ boxen --border-style='1234-|' ASCII ftw!
    1----------2
    |ASCII ftw!|
    3----------4

```


## Related

- [boxen](https://github.com/sindresorhus/boxen) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
