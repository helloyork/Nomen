import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess(),
  optimizeDeps: { include: [ 'objection', 'knex', 'pg' ], exclude: [ 'pg-native' ] }
};

export default config;