// Runs after `astro build`. When the site is served from a sub-path (GitHub Pages project sites live under
// /<repo>/), the links written by hand in the pages and in the Markdown (`/introduction/`, `/favicon.svg`) have to
// carry that prefix too. Astro already prefixes what it generates (assets, sidebar, search); this adds it to the rest.
//
// BASE_PATH=/linea-web npm run build      -> prefixes root-absolute links with /linea-web
// npm run build                           -> nothing to do (served from the root)
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const raw = (process.env.BASE_PATH ?? '').trim();
const base = raw === '' || raw === '/' ? '' : '/' + raw.replace(/^\/+|\/+$/g, '');
if (!base) {
	console.log('[apply-base] no BASE_PATH: links stay as they are');
	process.exit(0);
}

const needsPrefix = (v) => v.startsWith('/') && !v.startsWith('//') && v !== base && !v.startsWith(base + '/');
const prefix = (v) => base + v; // '/' becomes '/linea-web/'

const walk = async (dir) =>
	(await Promise.all((await readdir(dir, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])))).flat();

let files = 0, links = 0;
for (const file of (await walk('dist')).filter((f) => f.endsWith('.html'))) {
	const html = await readFile(file, 'utf8');
	const out = html
		// <a href>, <link href>, <img src>, <script src>, <form action>
		.replace(/(\s(?:href|src|action|poster)=)(["'])(\/[^"']*)\2/g, (m, a, q, v) => (needsPrefix(v) ? (links++, `${a}${q}${prefix(v)}${q}`) : m))
		// <meta http-equiv="refresh" content="0;url=/x/"> written for the redirects
		.replace(/(content=["']\d+;\s*url=)(\/[^"']*)/g, (m, a, v) => (needsPrefix(v) ? (links++, a + prefix(v)) : m));
	if (out !== html) {
		await writeFile(file, out);
		files++;
	}
}
console.log(`[apply-base] ${links} links prefixed with ${base} in ${files} pages`);
