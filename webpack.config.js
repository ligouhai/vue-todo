const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev =  process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [ //处理.vue文件
            {   
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [// 将css写到html里面去
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader', // 转成base64的
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]

            }
        ]
    },
    plugins: [// 添加html挂载js
        new webpack.DefinePlugin({
            'process.env': { // 能在控制台看到是什么环境
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
   
}

// 判断环境是开发还是正式

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: '8888',
        host: '0.0.0.0',
        overlay: {  // webpack编译出现错误，则显示到网页上
            errors: true,
        },
        // open: true,

        // 不刷新热加载数据
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config