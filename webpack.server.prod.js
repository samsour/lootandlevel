const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: [
        path.resolve(__dirname, 'src', 'server', 'serverMain.js')
    ],

    output: {
        path: path.resolve(__dirname, 'dist', 'server')
    },

    optimization: {
        minimizer: [new TerserPlugin()],
    }
}