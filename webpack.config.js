const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const nodeExternals = require('webpack-node-externals');

// 用于 pwa
const WorkboxPlugin = require('workbox-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

const { HotModuleReplacementPlugin, DefinePlugin } = webpack;

const {
  title,
  description,
  keywords,
  shareOptions = [],
  favicon,
  externals,
  defines = {},
  alias = {},
  devServer = {},
  pwa = false,
} = require('./defaultSettings.js');

const config = {
  mode: 'development',

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/', // 否则 browser-router 子路由会定位错误
    filename: '[name]_[contenthash].js',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
      title, // 页面标题
      description, // 描述、关键字
      keywords, // 描述、关键字
      shareOptions,
      favicon: path.resolve(__dirname, './public', favicon), // 页面logo
      // filename,
      // meta,
      // base,
      // hash:true,
      // publicPath
    }),

    // css 文件单独拆分出来
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),

    // 设定关联时不是通过数字， 而是路径转换的hash值来标记模块；
    //  已经通过 optimization.moduleIds = 'deterministic' 配置此效果，
    // new HashedModuleIdsPlugin(),
    new webpack.ProgressPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },

      {
        test: /.less$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'antd', 'lib'),
          path.resolve(__dirname, 'node_modules', 'rc-trigger'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'antd', 'lib'),
          path.resolve(__dirname, 'node_modules', 'antd', 'dist'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg|tff)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  // 全部第三方包使用 CDN
  // target: ['web', 'es5'],
  // externals: [nodeExternals()],

  // 部分第三方包使用 CDN
  externalsType: 'script',
  externals,

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.png', '.jpg', '.svg'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...alias,
    },
  },

  target: 'web',
  // browserslist: {

  // }

  stats: 'minimal',

  // 提升打包效率
  optimization: {
    moduleIds: 'deterministic',
    // webpack 连接模块所需的 加载和解析逻辑, 单独分离到一个文件
    runtimeChunk: 'single',
    // 将第三方库单独打包
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },

    moduleIds: 'named',
    chunkIds: 'named',
  },
};

module.exports = (env, argv) => {
  let definePairs = { ...defines };

  if (argv.mode === 'development') {
    (config.output.path = path.resolve(__dirname, './dev_dist')),
      (config.devtool = 'eval-source-map');
    config.devServer = {
      contentBase: path.join(__dirname, 'dev_dist'),
      watchContentBase: true, // 监听文件更新，刷新页面

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },

      // 同时设定才能通过本机 ip 打开
      host: '0.0.0.0', // 不设置会拒绝访问
      useLocalIp: true,
      port: 9000,

      compress: true,
      open: true,
      hot: true,

      watchOptions: {
        // 重新出发打包的延迟
        aggregateTimeout: 100,
        // 忽略文件
        ignored: ['**/node_modules'],
        // true 为启用 watch, 设置 1000（获取他数字）表示每 xx 毫秒轮询检查文件更新
        poll: true,
      },

      // inline: true,
      // hotOnly: true,

      // 浏览器刷新时，子路径也会默认指向打包的路径
      historyApiFallback: true,

      overlay: {
        warnings: true, // 打包时的错误信息， 会在页面强提醒
        errors: true, // 打包时的警告信息，会在页面强提醒
      },

      ...devServer,
    };

    config.plugins = config.plugins.concat([new HotModuleReplacementPlugin()]);

    definePairs['NODE_ENV'] = 'development';
    definePairs['WEBPACK_BUILD_TYPE'] = 'development';
  }

  // 生产环境打包
  else if (argv.mode === 'production') {
    console.log({ env, argv });

    config.mode = 'production';
    // TODO webpack 文档推荐正式打包使用
    config.devtool = 'source-map';

    // 服务器打包时报错
    // config.plugins = config.plugins.concat([
    //   new BundleAnalyzerPlugin({
    //     analyzerPort: 9001, // 监听端口
    //     defaultSizes: 'gzip', // 默认查看的 tab
    //     openAnalyzer: false, // 自动打开
    //   }),
    // ]);

    if (pwa) {
      config.plugins = config.plugins.concat([
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        }),
      ]);
    }

    definePairs['NODE_ENV'] = 'production';
    definePairs['WEBPACK_BUILD_TYPE'] = env.buildType;
  }

  // 格式化
  for (let key in definePairs) {
    definePairs[key] = JSON.stringify(definePairs[key]);
  }

  // 全局变量
  config.plugins.push(new DefinePlugin(definePairs));

  return config;
};
