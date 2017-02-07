var webpack = require('webpack');
var defaultConfig = require('./webpack.default.config');
var _ = require('lodash');

module.exports = _.extend({}, defaultConfig, {
    name: 'Development Webpack',
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                BROWSER: true,
                NODE_ENV: 'development'
            })
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});