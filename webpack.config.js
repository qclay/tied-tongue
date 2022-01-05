const src = 'src';
const dist = 'public';

const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); ``
const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const developmentMode = process.env.NODE_ENV === 'development';
const productionMode = !developmentMode;

module.exports = {
    context: path.resolve(__dirname, src),
    entry: {
        index: ["@babel/polyfill", "./index.js"],
    },
    output: {
        path: path.resolve(__dirname, dist),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: false
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            '@root': path.resolve(__dirname, src)
        }
    },
    devServer: {
        port: 9500,
        contentBase: path.resolve(__dirname, src),
        watchContentBase: true,
        inline: true,
        hot: true,
        host: "localhost"
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: "assets",
                    from: "**/*.{svg,png,jpeg,jpg,webp,gif}",
                    to: "assets",
                    noErrorOnMissing: true
                },
                {
                    context: "assets/images",
                    from: "**/*.{ttf,woff,woff2,eot}",
                    to: "assets/fonts",
                    noErrorOnMissing: true
                },
                {
                    context: "assets/videos",
                    from: "**/*.{avi,mkv,mp4,webm,ogf}",
                    to: "assets/videos",
                    noErrorOnMissing: true
                },
            ]
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            title: "Todo.",
            minify: {
                collapseWhitespace: false
            },
            favicon: "./favicon.png"
        }),
        new HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                          sassOptions: {
                              outputStyle: 'expanded'
                          }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf|jpe?g|png|svg|webp|avi|mkv|mp4|webm|ogf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                        ],
                        plugins: [
                            "@babel/plugin-proposal-private-methods",
                            "@babel/plugin-proposal-class-properties",
                        ]
                    }
                }
            }
        ]
    }
}