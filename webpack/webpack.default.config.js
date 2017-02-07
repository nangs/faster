var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, '..', 'public', 'build');
var entry = path.resolve(__dirname, '..', 'src', 'client', 'index.js');
var nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
    target: 'web',
    entry: [
        'webpack-dev-server/client?http://localhost:3001/',
        entry
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: [nodeModulesPath] },
            { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
            { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
        ]
    }
};