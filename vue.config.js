
module.exports = {
  devServer: {
    proxy: {
	  '/api':{
	  	target:'http://a.aiqiyin.cn/lingshou/',
	  
	  	changeOrigin: true,
	  	pathRewrite:{'^/api':''}
	  }
    },
	
  }
}