import test from 'ava';
import execa from 'execa';

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
	t.is((await execa('./cli.js', ['a'])).stdout, fixtureDefault);
});

test('stdin', async t => {
	t.is((await execa('./cli.js', {input: 'a'})).stdout, fixtureDefault);
});

test('option `--margin`', async t => {
	t.is((await execa('./cli.js', ['a', '--margin', '1'])).stdout, fixtureMargin);
});

test('option `--border-style` - named', async t => {
	t.is((await execa('./cli.js', ['a', '--border-style=double'])).stdout, fixtureDouble);
});

test('option `--border-style` - custom old format', async t => {
	t.is((await execa('./cli.js', ['a', '--border-style=123456'])).stdout, fixtureCustomOldFormat);
});

test('option `--border-style` - custom', async t => {
	t.is((await execa('./cli.js', ['a', '--border-style=12345678'])).stdout, fixtureCustom);
});

test('option `--width`', async t => {
	t.is((await execa('./cli.js', ['a', '--width=9'])).stdout, fixtureWidth);
});
