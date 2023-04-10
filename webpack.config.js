const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const csp = require('csp-html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const rulesForJavascript = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { // Babel packages necessary to be able to transpillar the JavaScript code
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        {
          plugins: ['@babel/plugin-transform-runtime']
        }
      ]
    }
  }
}

const rulesForStyles = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}

const rulesForSasStyles = {
    test: /\.(s(a|c)ss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
}

const rules = [rulesForJavascript, rulesForStyles, rulesForSasStyles]

module.exports = {
  entry: './src/index.js',
  // mode: 'production',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  devServer: {
    open: true,
    compress: true,
    port: 8080,
    static: './build',
  },
  devtool: 'source-map',
  module: {
    rules: rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // Set the CSP policy
      csp: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", "http://almacen.fly.dev"],
        },
        enabled: true,
      }
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.ts', '.js']
  }
}
