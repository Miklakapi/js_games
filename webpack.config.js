const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main[contenthash].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3030,
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
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
    ]
}
