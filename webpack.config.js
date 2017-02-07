var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3001/',
        'webpack/hot/only-dev-server',
        './src/client'
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: [nodeModulesPath] },
            { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] },
            {
                test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    }
};
