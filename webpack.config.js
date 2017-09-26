// module.exports = {
//   entry: __dirname + '/client/src/index.jsx',
//   output: {
//     path: __dirname + '/client/dist',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.jsx$/,
//       include: __dirname + '/client/src',
//       loader: 'babel-loader',
//       query: {
//         presets: ['react', 'es2015']
//       }
//     }]
//   }
// }

var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};