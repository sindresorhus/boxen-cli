#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const boxen = require('boxen');

const cli = meow(`
	Usage
	  $ boxen <string>
	  $ echo <string> | boxen

	Options
	  --border-color  Color of the box border [black|red|green|yellow|blue|magenta|cyan|white|gray]
	  --border-style  Style of the box border [single|double|round|single-double|double-single]
	                  Can also be passed as a string specifying the characters to use. See example below.
	  --padding       Space between the text and box border
	  --margin        Space around the box

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

`, {
	string: 'border-style'
});

const input = cli.input;

function cleanupBorderStyle(borderStyle) {
	if (!borderStyle) {
		// no borderStyle was specified
		return 'single';
	}
	if (borderStyle in boxen._borderStyles) {
		// a known named style was specified
		return borderStyle;
	}
	if (borderStyle.length !== 6) {
		console.error('Specified custom border style is invalid');
		process.exit(1);
	}
	// A string with 6 characters was given, make it a boxen-borderStyle object
	return {
		topLeft: borderStyle[0],
		topRight: borderStyle[1],
		bottomLeft: borderStyle[2],
		bottomRight: borderStyle[3],
		horizontal: borderStyle[4],
		vertical: borderStyle[5]
	};
}

function init(data) {
	cli.flags.borderStyle = cleanupBorderStyle(cli.flags.borderStyle);
	console.log(boxen(data, cli.flags));
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
