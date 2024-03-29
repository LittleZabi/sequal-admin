import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		enableSourcemap: true
	},
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	//preprocess: vitePreprocess(),
	// preprocess: preprocess({
	// 	scss: {
	// 	  implementation: require('sass'),
	// 	  sourceMap: true,
	// 	},
	//   }),
	preprocess: preprocess({
		scss: {
			sourceMap:true,
			//sourceMapContents: true
		}
	}),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$img: './src/lib/assets/',
			$compo: './src/components/'
		}
	}
};

export default config;
