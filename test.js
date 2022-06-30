import test from 'ava';
import {execa} from 'execa';

const fixtureDefault = `
┌─┐
│a│
└─┘
`.trim();

const fixtureMargin = `
   ┌─┐
   │a│
   └─┘
`;

const fixtureDouble = `
╔═╗
║a║
╚═╝
`.trim();

const fixtureWidth = `
┌───────┐
│a      │
└───────┘
`.trim();

const fixtureCustomOldFormat = `
152
6a6
354
`.trim();

const fixtureCustom = `
152
7a8
364
`.trim();

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['a']);
	t.is(stdout, fixtureDefault);
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {input: 'a'});
	t.is(stdout, fixtureDefault);
});

test('option `--margin`', async t => {
	const {stdout} = await execa('./cli.js', ['a', '--margin', '1']);
	t.is(stdout, fixtureMargin);
});

test('option `--border-style` - named', async t => {
	const {stdout} = await execa('./cli.js', ['a', '--border-style=double']);
	t.is(stdout, fixtureDouble);
});

test('option `--border-style` - custom old format', async t => {
	const {stdout} = await execa('./cli.js', ['a', '--border-style=123456']);
	t.is(stdout, fixtureCustomOldFormat);
});

test('option `--border-style` - custom', async t => {
	const {stdout} = await execa('./cli.js', ['a', '--border-style=12345678']);
	t.is(stdout, fixtureCustom);
});

test('option `--width`', async t => {
	const {stdout} = await execa('./cli.js', ['a', '--width=9']);
	t.is(stdout, fixtureWidth);
});
