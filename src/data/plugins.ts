import { links } from './links';

// The catalog shown on /plugins/. Mirrors marketplace.json of lbdudc/linea-plugins: add an entry here when a plugin is added there.
export interface Plugin {
	id: string;
	name: string;
	icon: string; // an icon of components/Icon.astro
	summary: string;
	/** What it is for: the problem it solves, in a sentence or two. */
	purpose: string;
	features: string[];
	/** Where it runs. */
	runs: 'in LINEA' | 'in LINEA + service' | 'service';
	/** Extra container or package the plugin needs, if any. */
	needs?: string;
	tags: string[];
	source: string;
	docs?: string;
}

const src = (dir: string) => `${links.repo.plugins}/tree/main/${dir}`;

export const plugins: Plugin[] = [
	{
		id: 'analytics-plugin',
		name: 'Feature model analysis',
		icon: 'chart',
		summary: 'Analyses the feature model of a line with flamapy.',
		purpose:
			'Tells you whether your feature model is healthy before you derive anything: which features are always selected, which can never be, whether any product exists at all, and how many.',
		features: ['Core and dead features', 'Satisfiability and number of configurations', 'Figures strip and analysis panel on the line'],
		runs: 'in LINEA + service',
		needs: 'The flamapy service: image ghcr.io/lbdudc/linea-flamapy (docker-compose.plugins.yml of LINEA)',
		tags: ['analysis', 'feature model', 'flamapy', 'quality'],
		source: src('analytics-plugin'),
	},
	{
		id: 'agents-plugin',
		name: 'AI agents',
		icon: 'bot',
		summary: 'AI agents that work on your lines: sync resolver, line health, evolution.',
		purpose:
			'Hands the tedious parts of keeping a line and its products in step to an AI agent: it proposes how to resolve a sync conflict, reviews the health of a line and suggests how it should evolve. The agents appear as pages of LINEA, under Agents.',
		features: ['Sync conflict resolver', 'Line health review', 'Evolution suggestions', 'Acts as the signed-in person, through LINEA’s API'],
		runs: 'in LINEA + service',
		needs: 'The agents service: image ghcr.io/lbdudc/linea-agents, with its own database and an API key for your AI provider',
		tags: ['ai', 'agents', 'sync', 'automation'],
		source: src('agents-plugin'),
	},
	{
		id: 'spl-code-editor',
		name: 'SPL code editor',
		icon: 'file',
		summary: 'Edit the code of a simple SPL in the browser, with its features beside it.',
		purpose:
			'For lines that keep their code in one repository: open and edit files without leaving LINEA, see which code belongs to which feature, and try a derivation without creating a product.',
		features: ['File editor in the Code tab', 'Feature ↔ code annotations', 'Trial derivation without a product', 'Limits for file size and extensions'],
		runs: 'in LINEA',
		tags: ['editor', 'code', 'annotations', 'derivation'],
		source: src('spl-code-editor'),
	},
	{
		id: 'mcp-plugin',
		name: 'MCP server',
		icon: 'server',
		summary: 'Use a line from an AI client (Claude, Cursor…) over the Model Context Protocol.',
		purpose:
			'Lets an AI assistant read and edit a line (its feature model, products and generations) as the person who connects, so permissions, validation and git stay LINEA’s.',
		features: ['Tools for the feature model, products and generation', 'Read-only mode', 'Works with Claude Desktop, Claude Code, Cursor'],
		runs: 'service',
		needs: 'The npm package @lbdudc/linea-plugin-mcp (needs Node.js)',
		tags: ['ai', 'mcp', 'claude', 'cursor', 'integration'],
		source: src('mcp-plugin'),
		docs: links.npm.mcp,
	},
];
