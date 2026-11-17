// Every outward link of the site lives here, so the landing and the docs never hardcode one. Change a URL (or the org) once.
const org = 'lbdudc';
const gh = (repo: string) => `https://github.com/${org}/${repo}`;

export const links = {
	org: `https://github.com/${org}`,
	repo: {
		linea: gh('linea'),
		plugins: gh('linea-plugins'),
		metamodels: gh('linea-metamodels'),
		web: gh('linea-web'),
	},
	issues: `${gh('linea')}/issues`,
	releases: `${gh('linea')}/releases`,
	plugins: { catalog: `${gh('linea-plugins')}/blob/main/marketplace.json` },
	npm: {
		cli: 'https://www.npmjs.com/package/@lbdudc/linea-cli',
		core: 'https://www.npmjs.com/package/@lbdudc/linea-core',
		git: 'https://www.npmjs.com/package/@lbdudc/linea-git',
		ci: 'https://www.npmjs.com/package/@lbdudc/linea-ci',
		sdk: 'https://www.npmjs.com/package/@lbdudc/linea-plugin-sdk',
		mcp: 'https://www.npmjs.com/package/@lbdudc/linea-plugin-mcp',
	},
	docker: {
		server: `https://github.com/${org}/linea/pkgs/container/linea-server`,
		client: `https://github.com/${org}/linea/pkgs/container/linea-client`,
	},
};

/** The commands the site shows, in one place, so they match the packages and images that are published. */
export const commands = {
	docker: [
		'git clone ' + gh('linea') + ' && cd linea/deploy',
		'cp .env.example .env',
		'docker compose up -d',
	],
	cli: ['bunx @lbdudc/linea-cli'],
	source: ['git clone ' + gh('linea'), 'cd linea && npm install', 'npm run dev'],
};
