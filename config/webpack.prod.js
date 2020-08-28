const { merge } = require('webpack-merge');
const base = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    // const { DefinePlugin } = require('webpack')

module.exports = merge(
    base, {
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        compress: {
                            //drop_console: true,
                        },
                        output: {
                            comments: false,
                        }
                    }
                })
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name][hash].css',
            }),
        ]
    }
)