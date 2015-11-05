
webpack = require('webpack')

module.exports = {
    entry: "./src/pikaday2.js",
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    output: {
        path: './dist/',
        filename: 'pikaday2.js',
        libraryTarget: 'var',
        library: 'Pikaday2'
    }
};
