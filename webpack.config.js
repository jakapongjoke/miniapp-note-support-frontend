module.exports = {
    resolve:{
        fallback:{
            os:false,
            process:require.resolve("process/browser`")
        }
    }
}