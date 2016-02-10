import test from 'ava';
import execa from 'execa';

const fixtureDefault = `
┌─┐
│a│
└─┘
`.trim();

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
	t.is((await execa('./cli.js', ['a'])).stdout, fixtureDefault);
});

test('stdin', async t => {
	t.is((await execa.shell(`echo a | ./cli.js`)).stdout, fixtureDefault);
});

test('option `--border-style` - named', async t => {
	t.is((await execa('./cli.js', ['a', '--border-style', 'double'])).stdout, fixtureDouble);
});

test('option `--border-style` - custom', async t => {
	t.is((await execa('./cli.js', ['a', '--border-style', '123456'])).stdout, fixtureCustom);
});
