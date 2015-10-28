module.exports = {
    entry: "./src/pikaday2.js",
    module: {
        loaders: [{
            test: /pikaday2\.js$/,
            loader: 'expose?Pikaday2',
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel?stage=0"
        }]
    },
    output: {
        path: './dist/',
        filename: "pikaday2.js"
    },
};
