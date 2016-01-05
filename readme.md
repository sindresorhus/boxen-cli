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
    --border-color  Color of the box border [black|red|green|yellow|blue|magenta|cyan|white|gray]
    --padding       Space between the text and box border
    --margin        Space around the box

  Example
    $ boxen I ❤ unicorns
    ┌────────────┐
    │I ❤ unicorns│
    └────────────┘
```


## Related

- [boxen](https://github.com/sindresorhus/boxen) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
