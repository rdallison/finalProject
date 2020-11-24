const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin  = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
            }
            
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),

        new WorkboxPlugin.GenerateSW()
        // new WorkboxPlugin.GenerateSW({
        //     // Do not precache images
        //     exclude: [/\.(?:png|jpg|jpeg|svg)$/, /swagger-ui/],
        //     clientsClaim:true,
        //     skipWaiting:true,
      
        //     // Define runtime caching rules.
        //     runtimeCaching: [{
        //       // Match any request that ends with .png, .jpg, .jpeg or .svg.
        //       urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      
        //       // Apply a cache-first strategy.
        //       handler: 'CacheFirst',
      
        //       options: {
        //         // Use a custom cache name.
        //         cacheName: 'images',
      
        //         // Only cache 10 images.
        //         expiration: {
        //           maxEntries: 10,
        //         },
        //       },
        //     }],
        //   }),
    ]
}