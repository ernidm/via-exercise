/*eslint-env node*/

let log = console.log;
let path = require("path");

log("process.env.NODE_ENV: " + process.env.NODE_ENV);

let config = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, "src/js"),
				use: {
					loader: "babel-loader",
				query: {
						presets: ['@babel/react']
					}
				}
			},
			{
				test: /\.html$/,
				include: path.resolve(__dirname, "src/html"),
				use: [{
					loader: "html-loader",
					options: { minimize: true }
				}]
			},
		]
	},

	resolve: {
		alias: {
			modules: path.resolve(__dirname, 'src/js/modules'),
			components: path.resolve(__dirname, 'src/js/components'),
			store: path.resolve(__dirname, 'src/js/store'),
			assets: path.resolve(__dirname, 'src/assets'),
			images: path.resolve(__dirname, 'src/images'),
			json: path.resolve(__dirname, 'src/json'),
			js: path.resolve(__dirname, 'src/js')
		}
	}
};

module.exports = config;