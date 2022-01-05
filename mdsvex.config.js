import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = {
	extensions: ['.svelte.md', '.md'],

	smartypants: {
		quotes: true,
		ellipses: true,
		backticks: true,
		dashes: 'oldschool'
	},

	layout: {
		basic: path.join(dirname, './src/lib/components/Article.svelte')
	},

	remarkPlugins: [],
	rehypePlugins: []
};

export default config;
