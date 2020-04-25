const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/server/', to: '../server' },
            { from: 'src/common/', to: '../common' }
        ])
    ]
})
