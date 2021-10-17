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
	t.is(await execa.stdout('./cli.js', ['a']), fixtureDefault);
});

test('stdin', async t => {
	t.is(await execa.stdout('./cli.js', {input: 'a'}), fixtureDefault);
});

test('option `--margin`', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--margin', '1']), fixtureMargin);
});

test('option `--border-style` - named', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=double']), fixtureDouble);
});

test('option `--border-style` - custom old format', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=123456']), fixtureCustomOldFormat);
});

test('option `--border-style` - custom', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=12345678']), fixtureCustom);
});

test('option `--width`', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--width=9']), fixtureWidth);
});
