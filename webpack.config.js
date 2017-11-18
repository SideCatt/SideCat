const devPort = 8080;
const path = require('path');
const srcDir = path.join(__dirname, '/src');
const distDir = path.join(__dirname, '/dist/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(srcDir, 'index.html'),
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: [
		'babel-polyfill',
		path.join(srcDir, 'js', 'index.js')
	],
	output: {
		filename: 'bundle.js',
		path: distDir,
		publicPath: '/'
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	module: {
		loaders: [
			{
				include: srcDir,
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				include: srcDir,
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [ HtmlWebpackPluginConfig ]
};