const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'src', 'client'),
        publicPath: 'http://localhost:8080/',
        compress: true,
        port: 8080
    }
})
