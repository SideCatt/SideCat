const devPort = 8080;
const path = require('path');
const srcDir = path.join(__dirname, '/src');
const distDir = path.join(__dirname, '/dist/');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(srcDir, 'index.html'),
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	devServer: {
		inline: true,
		hot: true
	},
	devtool: 'inline-source-map',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
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
				test: /\.(jsx|js)?$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader',
					'react-hot-loader'
				]
			}
		]
	},
	resolve: {
		alias: {
			js: path.join(srcDir, 'js'),
			sass: path.join(srcDir, 'sass')
		}
	},

	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};