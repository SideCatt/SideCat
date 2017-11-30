import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import { minify } from 'uglify-es';
import path from 'path';
import uglify from 'rollup-plugin-uglify';

const srcDir = path.join(__dirname, '/src');

export default {
	input: 'src/js/sidecat.js',
	output: {
		file: 'es/sidecat.js',
		format: 'es'
	},
	plugins: [
		alias({
			resolve: [ '.jsx', '.js' ],
			js: path.join(srcDir, 'js')
		}),
		babel({
			exclude: 'node_modules/**',
			plugins: [ 'external-helpers' ]
		}),
		uglify({}, minify)
	]
};