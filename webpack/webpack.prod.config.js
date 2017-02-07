var webpack = require('webpack');
var defaultConfig = require('./webpack.default.config');
var _ = require('lodash');

module.exports = _.extend({}, defaultConfig, {
    name: 'Development Webpack',
    cache: false,
    devtool: 'source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                BROWSER: true,
                NODE_ENV: 'production'
            })
        })
    ]
});