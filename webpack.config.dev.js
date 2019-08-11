const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/'

const BUILD_DIR = path.resolve(__dirname, 'build')
const PUBLIC_DIR = path.resolve(__dirname, 'public')
const SRC_DIR = path.resolve(__dirname, 'src')
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')
const ARINE_EMAIL = "support@arine.io"
const ARINE_PHONE = "1-833-ArineRx (1-833-274-6379)"


module.exports = {
    entry: {
        js: ['babel-polyfill', SRC_DIR + '/index.js'],
        vendor: ['react']
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test : /\.jsx?/,
                include : SRC_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-react-loader'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'assets/',
                            publicPath: ASSET_PATH
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: [
          SRC_DIR,
          NODE_MODULES_DIR
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        //new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("development") } }),
        new webpack.DefinePlugin({
                                  "process.env" : {
                                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                                    ARINE_EMAIL: JSON.stringify(ARINE_EMAIL),
                                    ARINE_PHONE: JSON.stringify(ARINE_PHONE)
                                  }
                                }),
        new CleanWebpackPlugin(BUILD_DIR),
        new CopyWebpackPlugin(
            [
                {
                    from: PUBLIC_DIR, to: BUILD_DIR
                }
            ],
            {
                ignore: [
                    '*.DS_Store'
                ]
            }
        )
    ],
}
