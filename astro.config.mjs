// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/fundamentals/what-is-linea': '/concepts/what-is-linea/',
		'/fundamentals/metamodels': '/concepts/metamodels/',
		'/fundamentals/modules': '/concepts/modules/',
		'/setup/installation-and-configuration': '/install/overview/',
		'/setup/plugins': '/configure/plugins/',
		'/usage/getting-started': '/guides/getting-started/',
	},
	integrations: [
		// Debe ir antes de Starlight para transformar los bloques ```mermaid
		mermaid({
			theme: 'default',
			autoTheme: true,
			// a system font is always loaded when Mermaid measures the text, so labels are never clipped
			mermaidConfig: {
				fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
				themeVariables: {
					fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
					fontSize: '15px',
					// git graph: main green, bigbang cyan, extra branches violet and amber
					git0: '#059669', git1: '#0891b2', git2: '#7c3aed', git3: '#d97706',
					gitBranchLabel0: '#ffffff', gitBranchLabel1: '#ffffff', gitBranchLabel2: '#ffffff', gitBranchLabel3: '#ffffff',
					commitLabelColor: '#64748b', commitLabelBackground: 'transparent',
					tagLabelColor: '#ffffff', tagLabelBackground: '#0891b2', tagLabelBorder: '#0891b2',
				},
				gitGraph: { showCommitLabel: true, mainBranchName: 'main' },
				flowchart: { padding: 16, nodeSpacing: 40, rankSpacing: 48, htmlLabels: true },
			},
		}),
		starlight({
			title: 'LINEA',
			logo: { src: './src/assets/logo.svg' },
			description:
				'Lifecycle management for software product lines (SPL) and the products derived from them.',
			defaultLocale: 'root',
			locales: { root: { label: 'English', lang: 'en' } },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/lbdudc/linea-web' },
			],
			editLink: { baseUrl: 'https://github.com/lbdudc/linea-web/edit/main/' },
			lastUpdated: true,
			// short inline code in table cells must not break mid-word (`splalm-mongo`, `local`); long values may wrap
			head: [
				{
					tag: 'script',
					content:
						"document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('.sl-markdown-content :not(pre)>code').forEach(function(c){var t=c.textContent.trim();var cell=c.closest('td,th');if(t.length<=30&&(cell||!/\s/.test(t)))c.classList.add('nw')})})",
				},
			],
			tableOfContents: false,
			customCss: ['./src/styles/starlight.css'],
			sidebar: [
				{ label: 'Welcome', slug: 'introduction' },
				{ label: 'Get started', items: [{ autogenerate: { directory: 'get-started' } }] },
				{ label: 'Install', items: [{ autogenerate: { directory: 'install' } }] },
				{ label: 'Configure', items: [{ autogenerate: { directory: 'configure' } }] },
				{ label: 'Concepts', items: [{ autogenerate: { directory: 'concepts' } }] },
				{ label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: 'Internals', collapsed: true, items: [{ autogenerate: { directory: 'internals' } }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
		}),
	],
});
