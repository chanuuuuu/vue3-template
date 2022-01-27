const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => {
  console.log(env, options)
  return {
    resolve: {
      extensions: ['.js', '.vue'],
      // 기본 경로의 별칭을 제공한다. 즉, mac 터미널과 같이 기본 경로를 조회할 때 사용한다. -> 상대경로를 사용할 떄, 매우 쉬워진다.
      alias: {
        '~': `${__dirname}/src`
      }
    },
    entry: './src/main.js',
    // entry: { main: '', module1: '', module2: '' },
    output: {
      // path: `${__dirname}/dist`,
      // filename: '[name].js',
      publicPath: '/',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @use "sass:color";
                  @use "sass:list";
                  @use "sass:map";
                  @use "sass:math";
                  @use "sass:meta";
                  @use "sass:selector";
                  @use "sass:string";
                  @import "~/scss/_variables";
                `
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlPlugin({
        template: './src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'static' }
        ]
      })
    ],
    devServer: {
      // port: 8080,
      // 값을 그대로 사용하기 위해서 
      historyApiFallback: true
    }
  }
}
