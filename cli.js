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

function parseMargin(opts) {
	if (!opts.margin) {
		return;
	}

	if (opts.center) {
		return {
			top: opts.margin,
			bottom: opts.margin
		};
	}

	return opts.margin;
}

function calculateBoxLength(box, opts) {
	const lineNumber = opts.margin ? opts.margin.top || opts.margin : 0;
	return box.split('\n')[lineNumber].length;
}

function init(data) {
	cli.flags.borderStyle = cleanupBorderStyle(cli.flags.borderStyle);
	cli.flags.margin = parseMargin(cli.flags);
	let box = boxen(data, cli.flags);

	let boxLength;
	if (cli.flags.center) {
		boxLength = calculateBoxLength(box, cli.flags);
		box = indentString(box, (process.stdout.columns - boxLength) / 2);
	} else if (cli.flags.right) {
		boxLength = calculateBoxLength(box, cli.flags);
		box = indentString(box, (process.stdout.columns - boxLength));
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
