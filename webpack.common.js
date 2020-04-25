const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const version = process.env.npm_package_version;

module.exports = {
    entry: [
        path.resolve(__dirname, 'src', 'client', 'clientMain.js'),
        path.resolve(__dirname, 'src', 'client', 'scss', 'main.scss')
    ],

    output: {
        path: path.resolve(__dirname, 'dist', 'client'),
        filename: 'app-v' + version + '.js'
    },

    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    // Bundles css files instead of loading styles with javascript
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // Translates CSS into CommonJS, useful if javascript loads css
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
                            url: (url, resourcePath) => {
                                // resourcePath - path to css file

                                // `url()` with `.ttf|.woff|.woff2|.eot` stay untouched
                                return !(
                                    url.includes('.ttf') ||
                                    url.includes('.woff') ||
                                    url.includes('.woff2') ||
                                    url.includes('.eot')
                                );
                            },
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: () => {
                return ['**/*'];
            },
        }),
        // Copy assets that are not processed by webpack bundling
        new CopyPlugin([
            { from: 'src/client/assets', to: 'assets' },
            { from: 'src/client/public/manifest.json', to: 'manifest.json' },
        ]),
        // Extract bundled css into separate css files
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css'
        }),
        // Create index.html with bundled files
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'client', 'public', 'index.html'),
            meta: {
                viewport: 'width=device-width, initial-scale=1.0',
            }
        })
    ]
}
