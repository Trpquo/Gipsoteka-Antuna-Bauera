import path from 'path';
import { fileURLToPath } from 'url';
import remarkFootnotes from "remark-footnotes";

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = {
	extensions: ['.svelte.md', '.md'],

	smartypants: {
		quotes: true,
		ellipses: true,
		backticks: true,
		dashes: 'oldschool'
	},

	layout:  path.join(dirname, './src/lib/components/Article.svelte'),

	remarkPlugins: [ remarkFootnotes ],
	rehypePlugins: []
};

export default config;
