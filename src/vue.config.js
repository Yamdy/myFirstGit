devServer : {
  proxy : {
   '/index' ; {
    target : 'http://localhost/index',
    // ws : true,
    changeOrigin ; true,
    pathRewrite ; {
     '^/index' ; ''
    }
   }
  }
 }
