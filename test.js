import test from 'ava';
import execa from 'execa';

const fixtureDefault = `
┌─┐
│a│
└─┘
`.trim();

const fixtureCenteredText = `
┌───────┐
│       │
│   a   │
│       │
└───────┘
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

const fixtureCustom = `
152
6a6
354
`.trim();

test('main', async t => {
	t.is(await execa.stdout('./cli.js', ['a']), fixtureDefault);
});

test('stdin', async t => {
	t.is(await execa.stdout('./cli.js', {input: 'a'}), fixtureDefault);
});

test('option `--align` center', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--align', 'center', '--padding', '1']), fixtureCenteredText);
});

test('option `--margin`', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--margin', '1']), fixtureMargin);
});

test('option `--border-style` - named', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=double']), fixtureDouble);
});

test('option `--border-style` - custom', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=123456']), fixtureCustom);
});
