import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import path from 'path';

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
		})
	]
};