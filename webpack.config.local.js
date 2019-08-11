const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'build')
const PUBLIC_DIR = path.resolve(__dirname, 'public')
const SRC_DIR = path.resolve(__dirname, 'src')
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')
const ARINE_EMAIL = "support@arine.io"
const ARINE_PHONE = "1-833-ArineRx (1-833-274-6379)"


const CONFIG = {
    host: '0.0.0.0',
    port: 3006
}

module.exports = {
    entry: {
        js: ['babel-polyfill', SRC_DIR + '/index.js'],
        vendor: ['react']
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        host: CONFIG.host,
        port: CONFIG.port,
        contentBase: PUBLIC_DIR,
        historyApiFallback: true,
        compress: true
    },
    devtool: 'cheap-eval-source-map',
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
                            localIdentName: '[path]__[local]___[hash:base64:5]'
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
                            name: '[name]___[hash].[ext]',
                            outputPath: 'assets/',
                            publicPath: '/'
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
        //  new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("localhost") } }),
        new webpack.DefinePlugin({
                                  "process.env" : {
                                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'lhost'),
                                    ARINE_EMAIL: JSON.stringify(ARINE_EMAIL),
                                    ARINE_PHONE: JSON.stringify(ARINE_PHONE)
                                  }
                                }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ],
}
