var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./app/index.jsx",
    debug: true,
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 300
        },
        // display only errors to reduce the amount of output
        stats: "errors-only",

        // parse host and port from env so this is easy
        // to customize
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            }
        ]
    },
    output: {
        publicPath: "/",
        filename: "bundle.js"
    }
};
