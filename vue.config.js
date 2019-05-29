module.exports = {
    configureWebpack: {
        node: {
            fs: 'empty',
            "graceful-fs": "empty"
        }
    }
  }
  