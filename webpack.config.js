const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main[contenthash].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3333,
        open: true,
        hot: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
    
    ]
}
