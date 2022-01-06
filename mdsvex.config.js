import path from 'path';
import { fileURLToPath } from 'url';
import relativeImages from "mdsvex-relative-images";
// import wrapImages from "./functions/remark-images.js";

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

	remarkPlugins: [ relativeImages ],
	rehypePlugins: []
};

export default config;
