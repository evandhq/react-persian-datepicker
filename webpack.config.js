var fs = require('fs');
var webpack = require('webpack');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = JSON.parse(babelrc);

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }
  })
];

if (process.env.NODE_ENV !== 'development') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  context: __dirname,
  entry: [
    './examples/src/main.js',
    './examples/src/main.css'
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
      'examples'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery)]
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loader: 'style!css?modules&importLoaders=1'
      },
      {
        test: /\.css?$/,
        include: /node_modules/,
        loader: 'style!css'
      }
    ]
  },
  output: {
    filename: 'build.js',
    path: __dirname + '/examples'
  },
  plugins: plugins
};