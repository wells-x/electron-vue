module.exports = {
    devServer: {
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        proxy: {
            '/': {
                target: 'http://localhost:8088/',
                // changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/r': ''
                }
            },
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    },
};
