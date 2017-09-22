let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let basePath = path.resolve('./');
module.exports = {
    entry: {
        main: basePath + '/main.js',
        vendor: ['RFMind'],
    },
    output: {
        //输入的目录的位置
        path: basePath + '/dist/',
        //输入的文件名，[name] 被 entry 里的对象键值所替代
        filename: "[name].js",
        publicPath: 'dist'
    },
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     use: [
            //         {
            //             loader: 'vue-loader',
            //             options: {
            //                 loaders: {
            //                     scss: 'vue-style-loader!css-loader!autoprefixer-loader!sass-loader?sourceMap', // <style lang="scss">
            //                     sass: 'vue-style-loader!css-loader!autoprefixer-loader!sass-loader?indentedSyntax&sourceMap', // <style lang="sass">
            //                     js: 'babel-loader?presets[]=es2015,presets[]=stage-2,plugins[]=transform-vue-jsx', // <style lang="sass">
            //                 }
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        compact: false,
                        presets: ['es2015', 'stage-2'],
                        // plugins: ['babel-plugin-transform-vue-jsx'],
                    }
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {loader: 'style-loader'},
            //         {loader: 'css-loader'},
            //     ]
            // },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     loaders: [
            //         'file-loader',
            //         {
            //             loader: 'image-webpack-loader',
            //             query: {
            //                 progressive: true,
            //                 optipng: {
            //                     optimizationLevel: 7
            //                 },
            //                 gifsicle: {
            //                     interlaced: false
            //                 },
            //                 pngquant: {
            //                     quality: '65-90',
            //                     speed: 4
            //                 }
            //             }
            //         }
            //     ]
            // }

        ]
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue',],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            //因为公共类库目录不在各个项目下面，所以这里都需要做映射
            'RFMind': basePath + '/src/RFMind.js',
            // 'vue': 'vue/dist/vue.common.js',
            // 'xdomain': 'xdomain/dist/xdomain.js',
        },
        // modules: [process.env.NODE_PATH || "node_modules"]
    },
    resolveLoader: {
        // modules: [process.env.NODE_PATH || "node_modules"]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({                                                                     // 构建html文件
    //         filename: basePath + '/index.html',
    //         template: basePath + '/tpl/index.ejs',
    //         inject: false
    //     }),
    // ],
    devtool: '#source-map'
};
