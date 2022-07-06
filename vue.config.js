module.exports={
    devServer:{
        proxy:{
            // '/ajax':{
            //     target:'http://m.maoyan.com',
            //     changeOrigin:true
            // },
            'api':{
                target:'https://www.bing.com',//域名
                changeOrigin:true, /**开启代理:在本地会创建一个虚拟服务器，然后发送请求的数据，并同时接收请求的数据
                这样服务器和服务端进行数据交互就不会有跨域的问题**/
                ws: true,//是否启用websockets
                pathRewrite: {
                    '^/api': ''
                }
            },

        }
    }
}