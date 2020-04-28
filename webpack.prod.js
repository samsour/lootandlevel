const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    merge(common, {
        mode: 'production',
        optimization: {
            minimizer: [new TerserPlugin()],
        }
    })
]