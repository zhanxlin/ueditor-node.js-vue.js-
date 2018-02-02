## node.js + vue.js 搭建ueditor   

> A Vue.js project 
>
> nodejs  ueditor  can upload images 

## 技术栈

后端：nodejs + express

前端：vue + vue-router + webpack

## 搭建运行

``` bash
# install dependencies
npm install

# 运行server服务器，部署在8888端口号上
cd server
node index.js


# 运行客户端，热加载形式部署在端口号8080上，浏览器输入http:localhost:8080即可访问
npm run dev

# build for production with minification
npm run build
```

说明：

a. 上传的图片视频等存放在server/public/目录下

b. 现在部署的是在本机上运行，若想让其他电脑通过ip地址访问，需要在package.json中找到语句：

 `"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",`

在其后面加上 --host 192.168.2.74(用自己的ip地址替换)，即：

    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 192.168.2.74",
c. 图片上传配置：在ueditor.config.js文件中，默认的配置是：

```
// 服务器统一请求接口路径
, serverUrl: URL + "php/controller.php"
```

改为：

```
// 服务器统一请求接口路径
, serverUrl:  "/ueditor/ue"
```

当ueditor加载时，首先会向服务端发送get请求：`http://localhost:1994/ueditor/ue?action=config`，获取与ueditor上传相关的配置文件`config.json`，只有成功返回配置文件才能使用上传功能。



## 布局

```
│  
├─build
│      
├─config                                         //webpack配置文件
│ 
├─node_modules
|
├─server                                         //nodejs后台文件
│  │  index.js                                   //后台主文件          
│  │                                                  
│  ├─public                                      //用于ueditor存放上传至后台文件     
│                                                          
├─src                                            //前端代码目录  
│  │  App.vue                                    //入口文件
│  │  main.js                                    //入口文件，加载组件        
│  │                                                  
│  ├─assets                                      //存放静态文件(这里不用到)     
│  │                                                      
│  ├─components                                  //组件文件夹                        
│  │  │  ue.vue                                  //Ueditor组件              
│  │                                                        
│  │                                                          
│  ├─router                                                
│  │  │  index.js                                //路由文件
│  │ 
│  ├─views
│  │  │  editor.vue                              //编辑器界面
│  │ 
└─static                                         //       
    ├─UE                                         //ueditor前台配置文件
    ├─css       							  //前台界面的样式
    ├─images								  //前台界面用到的图片
    ├─js									  //jquery
```




