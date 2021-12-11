var src_path = __dirname + '/client/src/index.js';
var dist_path = __dirname + '/client/dist';

module.exports = {
  mode: 'development',
  entry: src_path,
  output: {
    path: dist_path,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ]
  }
}