const express = require('express');
const app = express();

app.listen(2587,()=>{
    console.log('alishow-server is running...');
})
// 加载并配置模板引擎
app.engine('html',require('express-art-template'));
// 托管静态资源
app.use('/uploads',express.static('./view/uploads'));
app.use('/assets',express.static('./view/assets'));
app.use('/upload',express.static('./upload'));

// 注册body-parser中间件
const bodyp = require('body-parser');
app.use(bodyp.urlencoded({extended:false}));

// 将app.js文件所在的目录挂载到全局变量上
global.rootPath = __dirname;

// 加载session模块并注册为中间件
const session = require('express-session');
app.use(session({
    secret:'sjfiej2094089kfosjdodf',
    resave:false,
    saveUninitialized:false
}));

// 将检测中间件函数注册为中间件
app.use(checkSession);

// 加载栏目管理路由模块
const router_cate = require('./router/router_cate.js');
app.use(router_cate);

// 加载用户管理路由模块
const router_user = require('./router/router_user.js');
app.use(router_user);

// 加载个人中心路由模块
const router_center = require('./router/router_center.js');
app.use(router_center);

// 加载文章管理路由模块
const router_post = require('./router/router_post.js');
app.use(router_post);

// 加载文章管理路由模块
const router_other = require('./router/router_other.js');
app.use(router_other);

// 加载首页路由模块
const router_index = require('./router/router_index.js');
app.use(router_index);

// 加载接口文档路由模块
const api = require('./api.js');
app.use(api);

const url = require('url');
// 自定义检测session中间件函数
function checkSession(req,res,next){
    const arr = ['/api/login/checkLogin','/admin/login','/index','/detail','/list'];
    if(!arr.includes(url.parse(req.url).pathname)){
        if(!req.session.isLogin){
            // 如果没登录进入此判断
            return res.redirect ('/admin/login');
        }
    }
    next();
};
