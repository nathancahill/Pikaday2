module.exports = {
    entry: "./src/pikaday2.js",
    module: {
        loaders: [{
            test: /pikaday2\.js$/,
            loader: 'expose?Pikaday2',
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    output: {
        path: './dist/',
        filename: "pikaday2.js"
    },
};
