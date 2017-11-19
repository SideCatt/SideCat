const devPort = 8080;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const srcDir = path.join(__dirname, '/src');
const distDir = path.join(__dirname, '/dist/');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: path.join(srcDir, 'js', 'index.js'),
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom'
		]
	},
	devServer: {
		contentBase: distDir,
		port: devPort,
		hot: true
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				exclude: /node_modules/,
				include: srcDir,
				test: /\.(jsx|js)?$/,
				use: [
					{ loader: 'babel-loader' }
				]
			}
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: distDir
	},
	plugins: [
		new CleanWebpackPlugin([ 'dist' ]),
		new ExtractTextPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: path.join(srcDir, 'index.template.ejs'),
			title: 'React SideCat Working Page'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			js: path.join(srcDir, 'js'),
			sass: path.join(srcDir, 'sass')
		},
		extensions: [ '.js', '.jsx' ]
	}
};
