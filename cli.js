#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const fn = require('boxen');

const cli = meow(`
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
`);

const input = cli.input;

function init(data) {
	console.log(fn(data, cli.flags));
}

if (input.length === 0 && process.stdin.isTTY) {
	console.error('Specify a string');
	process.exit(1);
}

if (input.length > 0) {
	init(input.join(' '));
} else {
	getStdin().then(x => init(x.replace(/\n$/, '')));
}
