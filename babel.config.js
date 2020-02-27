/*eslint-env node*/

module.exports = function(api) {
	console.log("babel.config.js::process.env.NODE_ENV: " + process.env.NODE_ENV);
	console.log("babel.config.js::api.env(): " + api.env());
	api.cache(true);

	let presets = ["@babel/react"];

	let plugins = [
		["module-resolver", {
			"root": ["./src/**"]
		}]
	];

	let reactCSSModulesPlugin = {
		"filetypes": {
			".scss": {
				"syntax": "postcss-scss"
			}
		},
		"webpackHotModuleReloading": true,
		"handleMissingStyleName": "warn"
	};

	return {
		"env": {
			"production": {
				"plugins": [
					["react-css-modules", {
						...reactCSSModulesPlugin,
						"generateScopedName": "[hash:base64:5]"
					}]
				]
			},
			
			"development": {
				"plugins": [
					["react-css-modules", {
						...reactCSSModulesPlugin,
						"generateScopedName": "[local]--[hash:base64:5]"
					}]
				]
			}
		},

		presets,
		plugins
	};
}