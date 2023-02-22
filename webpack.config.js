const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.ts',
  target: "node", // use require() & use NodeJs CommonJS style
  // mode: "production",
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@src": path.resolve(__dirname, 'src/'),
      "@controllers": path.resolve(__dirname, 'src/controllers/'),
      "@entity": path.resolve(__dirname, 'src/entity/'),
      "@middlewares": path.resolve(__dirname, 'src/middlewares/'),
      "@migrations": path.resolve(__dirname, 'src/migrations/'),
      "@models": path.resolve(__dirname, 'src/models/'),
      "@providers": path.resolve(__dirname, 'src/providers/'),
      "@routes": path.resolve(__dirname, 'src/routes/'),
      "@services": path.resolve(__dirname, 'src/services/'),
      "@utils": path.resolve(__dirname, 'src/utils/')
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
};