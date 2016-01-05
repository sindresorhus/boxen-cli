import test from 'ava';
import execa from 'execa';

const fixture = `
┌─┐
│a│
└─┘
`.trim();

test('main', async t => {
	t.is((await execa('./cli.js', ['a'])).stdout, fixture);
});

test('stdin', async t => {
	t.is((await execa.shell(`echo a | ./cli.js`)).stdout, fixture);
});
