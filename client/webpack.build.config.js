process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

const logger = exports;
logger.debugLevel = 'warn';
logger.log = function (level, message) {
    const levels = ['error', 'warn', 'info'];
    if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        console.log(level + ': ' + message);
    }
};


const projectRootPath = path.resolve(__dirname);
const assetsPath = path.resolve(projectRootPath, './../server/src/main/resources/static/res');


module.exports = {
    devtool: "source-map",
    bail: true,
    entry: {
        main: ['./src/public_path', './src/index']
    },
    output: {
        path: assetsPath,
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        sourceMapFilename: "bundle.js.map",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [ 'env', 'react' ],
                            babelrc: false,
                            plugins: [
                                "react-hot-loader/babel",
                                "babel-plugin-transform-object-rest-spread",
                                "babel-plugin-transform-class-properties",
                                "babel-plugin-transform-flow-strip-types"
                            ]
                        }
                    }
                ]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.json$/, use: ['json-loader']},
            {
                test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream"
                    }
                }]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader'] },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml"
                    }
                }]
            },
            {
                test: /\.gif$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        mimetype: "image/gif"
                    }
                }]
            },
            {
                test: /\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        mimetype: "image/png"
                    }
                }]
            },
            {
                test: /\.jpg$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        mimetype: "image/jpeg"
                    }
                }]
            },
        ],
        //noParse: /\.min\.js/
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CleanPlugin([assetsPath], {root: projectRootPath}),

        // css files from the extract-text-plugin loader
        //new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),


        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.DefinePlugin({
            'process.env.BABEL_ENV': JSON.stringify('production'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
            __SHOW_DEVTOOLS__: false,
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true)

    ]
};
