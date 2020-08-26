const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    entry: {
        index: './src/index.tsx'
    },
    output: {
        filename: "[name][hash].js",
        path: resolve('dist'),
    },
    devServer: {
        host: 'localhost',
        port: 3333,
        https: false,
        open: true,
        contentBase: resolve('dist'),
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.css$/,
                include: resolve("src"),
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                include: resolve("src"),
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }, {
                    loader: "postcss-loader"
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                include: path.resolve(__dirname, "./src"),
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash:8].[ext]",
                        outputPath: "images/",
                        limit: 2048
                    }
                }, ]
            }
        ]

    },
    plugin: [
        new CleanWebpackPlugin()
    ]
}