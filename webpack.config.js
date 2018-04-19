const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//  css单独分离打包
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev =  process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index'),   //  输入: 项目主文件（入口文件）
    output: {   // 输出
        filename: 'bundle.[hash:8].js',     // 输出的文件名
        path: path.join(__dirname, 'dist')  // 输出路径
    },
    module: {    // 配置加载资源
        rules: [ // 规则
            {   
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader', // 文件小于1024字节，转换成base64编码，写入文件里面
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

if (isDev) {    // 开发环境
    config.module.rules.push({ // 编译css
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
    });

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
}else {  // 编译环境的配置
    config.entry = {   // 将所用到的类库单独打包
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };
    config.output.filename = '[name].[chunkhash:8].js' // 不能使用hash,否则每次打包类库也会一起打包
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    },)
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        //  将类库文件单独打包出来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // webpack相关的代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
    
}

module.exports = config