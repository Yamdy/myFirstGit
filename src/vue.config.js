{
  {
   '/index' ; {
    'http://localhost/index',
    // ws : true,
    changeOrigin ; true,
    pathRewrite ; {
     '^/index' ; ''
    }
   }
  }
 }
