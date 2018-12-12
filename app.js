/**
 *  app.js入口模块
 *  职责：
 *      创建服务
 *      做一些服务相关配置
 *      模板引擎
 *      body-parser 解析post请求体
 *      提供静态资源服务
 *      挂载路由
 *      监听端口，启动服务
 */
const express = require('express');
const app = express();
const router  = require('./router.js');
const bodyParser = require('body-parser');

//配置art-template
app.engine('html', require('express-art-template'));
//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//开放node_modules文件夹和public文件夹
app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));

//把路由容器router挂载到app服务中
app.use(router);

app.listen(3000, function (){
    console.log('express is running ....');
});