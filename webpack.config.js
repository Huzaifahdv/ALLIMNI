const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("postcss-preset-env")]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name][ext]",
                },
                use: [
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65, 
                            },
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.6, 0.8], 
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: "img",
                                        attribute: "src",
                                        type: "src",
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "login.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/register.html",
            filename: "register.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/student-page1.html",
            filename: "student-page1.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/student-page2.html",
            filename: "student-page2.html"
        }),
        new MiniCssExtractPlugin({ filename: "styles.css" }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        devMiddleware: {
            writeToDisk: (filePath) => {
                return !/hot-update/i.test(filePath);
              },
        },
        hot: true,
        open: true,
    },
    performance: {
        hints: false,
    },
};
