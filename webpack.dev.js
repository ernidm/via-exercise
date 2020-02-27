/*eslint-env node*/

let log = console.log;

let path = require("path");
let HtmlWebPackPlugin = require("html-webpack-plugin");
let merge = require("webpack-merge");
let common = require("./webpack.common.js");

const MODE = "development";
const DIST = "dist-dev-client";

log("MODE: " + MODE);

let configDev = merge(common, {
    mode: MODE,
    devtool: "eval-source-map",

	entry: {
		index: "./src/js/index.js"
	},

    output: {
		filename: "[name].js",
		path: path.join(__dirname, 'dist/'),
		publicPath: "/"
    },

    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: "style-loader",
                        options: {
                            injectType: "styleTag"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                            	localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 20000,
                        outputPath: 'images',
                        name: "[name].[ext]"
                    }
                }]
            }
        ]
    },

    plugins: [
		new HtmlWebPackPlugin({
            hash: true,
            inject: true,
            chunks: ["index"],
            template: path.join(__dirname, `src/html/index.html`),
            filename: `index.html`
        })
    ],

    devServer: {
		// contentBase: "./dist",
		disableHostCheck: true,
		historyApiFallback: {
			index: path.join(__dirname, `src/html/index.html`)
		},
        port: 4000
    }
});

module.exports = configDev;