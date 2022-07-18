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
    }
}