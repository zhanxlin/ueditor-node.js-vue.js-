# node.js + vue.js 搭建ueditor   

> A Vue.js project 
>
> nodejs  ueditor  can upload images 

## Build Setup

``` bash
# install dependencies
npm install

# 运行server服务器，部署在8888端口号上
cd server
node index.js


# 运行客户端 部署在端口号8080上，热加载
npm run dev

# build for production with minification
npm run build

```



安装server:

1. npm init

2. 服务器下载安装express和ueditor    npm install --save express    和ueditor

3. 建立public 文件夹，将ueditor中的example中的public复制到刚建立的public下

4. 建立index.js文件，代码为：


       var express =require('express');
       var app=express();
       var ueditor=require('ueditor');
       var path = require('path');
       var bodyParser = require('body-parser');
       app.use(bodyParser.urlencoded({
       extended: true
       }));
       
       app.use(bodyParser.json());
       // app.set('port',process.env.PORT||3000);
       app.get('/',function(req,res){
       res.type('text/plain');
       res.send('hello world!');
       })
       app.use(express.static('public'));
       app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
       //客户端上传文件设置
       var imgDir = '/img/ueditor/'
        var ActionType = req.query.action;
       if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
           var file_url = imgDir;//默认图片上传地址
           /*其他上传格式的地址*/
           if (ActionType === 'uploadfile') {
               file_url = '/file/ueditor/'; //附件
           }
           if (ActionType === 'uploadvideo') {
               file_url = '/video/ueditor/'; //视频
           }
           res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
           res.setHeader('Content-Type', 'text/html');
       }
       //  客户端发起图片列表请求
       else if (req.query.action === 'listimage') {
           var dir_url = imgDir;
           res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
       }
       // 客户端发起其它请求
       else {
           // console.log('config.json')
           res.setHeader('Content-Type', 'application/json');
           res.redirect('/nodejs/config.json');
       }
       }));
       //定制404页面
       app.use(function(req,res){
       res.type('text/plain');
       res.status(404);
       res.send('404---not found');
       });
       //定制505页面
       app.use(function(err,req,res,next){
       console.error(err.stack);
       res.type('text/plain');
       res.status(500);
       res.send('500 - Server Error');
       })
       
       app.listen(8888,function(){
       console.log("Express started on http://localhost:8888"+
           ";press Ctrl-c to terminate")
       })
   5.现在server运行的话监听的是8888端口，客户端运行的是8080端口，所以还需要进一步修改

   6.在config中的index.js中的proxyTable:{}中增加：

               '/ueditor': {
                   target: 'http://localhost:8888/',
                   changeOrigin: true,
                   pathRewrite: {
                       '^/ueditor': '/ueditor'
                   }
               },
               '/nodejs': {
                   target: 'http://localhost:8888/',
                   changeOrigin: true,
                   pathRewrite: {
                       '^/nodejs': '/nodejs'
                   }
               },
               '/img': {
                   target: 'http://localhost:8888/',
                   changeOrigin: true,
                   pathRewrite: {
                       '^/img': '/img'
                   }
               }
   7.至此可以正常运行，先跑server node index.js,再跑客户端npm run dev

   ​

   ​






