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









//handlerbars引擎
// //设置视图引擎
// var express=require('express');
// var app=express();

// var handlerbars=require('express3-handlebars').create(
// 	{defaultLayout：'main'});//指明默认布局
// app.engine('handlebars',handlerbars.engine);
// app.set("view engine",'handlebars');
			








