const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    context: path.resolve(__dirname, './src'),
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        app: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')],
                    ignore: '/node_modules/'   
                }
            }
        }]
    }
};