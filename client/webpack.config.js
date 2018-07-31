const path = require('path');
const fs = require('fs');

const HappyPack = require('happypack');
const webpack = require('webpack');

const fileExist =(filePath) => {
    try {
        fs.statSync(filePath);
    } catch(err) {
        if(err.code == 'ENOENT') return false;
    }
    return true;
};


const PORT = 3000;

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${PORT}`,
        'webpack/hot/only-dev-server',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: `http://localhost:${PORT}/dist/`
    },
    devServer: {
        host: 'localhost',
        port: PORT,

        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server

        headers: { "Access-Control-Allow-Origin": "*" }
    },
    plugins: [
        new HappyPack({
            id: 'jsx',
            threads: 6,
            loaders: ['babel-loader']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEVTOOLS__: fileExist('.devtools'),
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],

        // modules: [
        //     path.join(__dirname, "node_modules")
        // ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=jsx'
            },
            {test: /\.css$/, loader: "style-loader!css-loader!resolve-url-loader"},
            {test: /\.less$/, loader: "style-loader!css-loader!resolve-url-loader!less-loader"},
            {test: /\.scss$/, loader:  "style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"},
            // {
            //     test: /\.jsx?$/,
            //     loaders: ['babel-loader'],
            //     exclude: path.resolve(__dirname, "node_modules"),
            // }
        ]
    }
};
