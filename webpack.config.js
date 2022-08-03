const webpack = require("webpack");

module.exports = {
    rules: [
   
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    resolve:{
        fallback:{
            os:false,
            process:require.resolve("process/browser`")
        }
    },
    plugins: {
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
}