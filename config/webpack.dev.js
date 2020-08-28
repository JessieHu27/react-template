const { merge } = require('webpack-merge');
const base = require('./webpack.config');
// const { DefinePlugin } = require('webpack')


module.exports = merge(
    base, {
        mode: 'development',
        devtool: 'sourcemap',
        plugins: [

        ]
    }
)