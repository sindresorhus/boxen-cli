#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const boxen = require('boxen');
const indentString = require('indent-string');

const cli = meow(`
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
	string: 'border-style',
	boolean: 'center'
});

const input = cli.input;

function cleanupBorderStyle(borderStyle) {
	if (!borderStyle) {
		return 'single';
	}

	if (borderStyle in boxen._borderStyles) {
		return borderStyle;
	}

	if (borderStyle.length !== 6) {
		console.error('Specified custom border style is invalid');
		process.exit(1);
	}

	// a string of 6 characters was given, make it a borderStyle object
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
	cli.flags.margin = cli.flags.center ? undefined : cli.flags.margin;
	let box = boxen(data, cli.flags);

	if (cli.flags.center) {
		const boxLength = box.split('\n')[0];
		box = indentString(box, ' ', (process.stdout.columns - boxLength.length) / 2);
	}

	console.log(box);
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
