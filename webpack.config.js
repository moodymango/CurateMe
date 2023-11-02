//webpack creates a static js file that is ready to be attached to my html
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//must require in dotenv in order for this to work
require("dotenv").config();
//module.exports to export
module.exports = {
  //the js entrypoint - references the top most level component
  entry: "./client/index.js",
  //this is only really relevant to our production mode since we need to direct where the created bundle.js file will go
  output: {
    //where to emit bundle
    path: path.resolve(__dirname, "dist"),
    //tells webpack the name of our bundle
    filename: "bundle.js",
    // //serves everything in this static directory to this route,
    // //not necessary in output
    publicPath: "/dist/",
  },
  //production -  webpack creates  a minified(stripes all whitespace), and uglified(shortening variable names) file.
  //development - forgoes minify/uglify process and makes bundling faster
  mode: process.env.NODE_ENV,
  //module tells webpack what kind of files to expect
  module: {
    rules: [
      {
        //regex does .js and jsx files
        test: /\.jsx?/,
        use: {
          //loader is run on the test jsx files
          loader: "babel-loader",
          options: {
            //   https://webpack.js.org/loaders/babel-loader/
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        //node_modules is ridiculously huge so always make sure to git ignore it
        exclude: /node_modules/,
      },
      {
        //all files with sass, scss and css file extentions
        test: /\.css$/i,
        //use with an array to use mutiple loaders with no presets
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    //serves the html file to client in lieu of our express server
    //https://webpack.js.org/concepts/#plugins
    //"generates an HTML file for your application and automatically injects all your generated bundles into this file."
    new HtmlWebpackPlugin({
      publicPath: "/dist",
      template: "./index.html",
    }),
  ],
  devServer: {
    //Specify a port number to listen for requests on:
    port: 8080,
    //enables hot module replacement (exchanges, adds, or removes modules while an app is running w/out full reload)
    hot: true,
    //serve static files from the directory
    historyApiFallback: true,

    static: {
      publicPath: "/",
      directory: path.resolve(__dirname),
    },
    //make it so that the fetch calls from the front end get to our actual backend
    proxy: {
      //must proxy ANY route in which we are making an api call
      //whenever we get a fetch request to signup, send it to the actual server on localhost:5050
      "/signup": "http://localhost:5050",
      "/login": "http://localhost:5050",
      "/search": "http://localhost:5050",
      "/:username": "http://localhost:5050",
      "/:username/collections": "http://localhost:5050",
      "/:username/collections/:title": "http://localhost:5050",
    },
  },
};
//I guess the following makes code cleaner, but isnnt related to webpack
// "eslint": "^7.12.1",
// "eslint-plugin-react": "^7.21.5",
