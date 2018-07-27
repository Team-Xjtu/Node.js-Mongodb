var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var _ = require('underscore');
var port = process.env.PORT || 3000;
// process是个全局变量，用来获取环境中的变量
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testCart');
var session=require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore=require('connect-mongo')(session);
mongoose.Promise = require('bluebird');

var app = express();
app.locals.moment = require('moment');
app.set('views', './views/pages');
// 设置视图的根目录
app.set('view engine', 'pug');

// 设置默认的模板引擎
// app.use(express.bodyParser());   过去版语法，现已不支持
app.use(bodyParser.urlencoded({
    extended: true
}));
//上面那个要加extended:true，否则会在post的时候出错
//将表单里的数据进行格式化
// app.use(express.static(path.join(__dirname,'bower_components')));  过去版语法，现已不支持
app.use(serveStatic('bower_components'));
// 设置静态目录，其实就是使view中引入的东西路径正确
app.use(cookieParser());
app.use(session({
    secret: 'haha',
    store:new mongoStore({
        url:'mongodb://localhost:27017/testCart',
        collection:'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
app.listen(port);
console.log('website started on port: ' + port);

// 0.pre reading
app.use(function(req,res,next){
    var _user=req.session.user;
    if(_user){
        app.locals.user=_user;
    }
    return next();
});

app.get('/', function(req, res) {
    res.render('index', {
        title: "欢迎来到后台管理系统首页",
        goods: ''
    });
});

var User = require('./routes/user');

app.use('/user', User);

//app.get('/logout', User.logout);

var Goods = require('./routes/goods');

app.use('/goods', Goods);

// 1.首页路由
//app.get('/', function(req, res) {
//    Goods.fetch(function(err, goods) {
//        if (err) {
//            console.log(err);
//        }
//        res.render('index', {
//            title: "欢迎来到后台管理系统首页",
//            goods: goods
//        });
//    });
//});
//// 2.商品详情的路由
//app.get('/goods/:id', function(req, res) {
//    var id = req.params.id;
//    if (id) {
//        Goods.findById(id, function(err, goods) {
//            if (err) {
//                return;
//            }
//            res.render('detail', {
//                title: goods.title,
//                goods: goods
//            });
//        });
//    }else{
//
//    }
//});
//
////// 3.电影更新路由，admin update movie
////app.get('/admin/update/:id', function(req, res) {
////    var id = req.params.id;
////    if (id) {
////        Movie.findById(id, function(req, movie) {
////            res.render('admin', {
////                title: '后台更新页',
////                movie: movie
////            });
////        });
////    } else {
////        console.log("你的电影并没有成功录入进去");
////    }
////});
////
//
//// 4.商品添加路由
//app.post('/addGoods', function(req, res) {
//    var id = req.body.goods._id;
//    var goodsObj = req.body.goods;
//    var _goods;
//    if (typeof(id) !== 'undefined') {
//        Goods.findById(id, function(err, goods) {
//            if (err) {
//                console.log(err);
//            }
//            _goods = _.extend(goods, goodsObj);
//            _goods.save(function(err, goods) {
//                if (err) {
//                    console.log(err);
//                }
//                res.redirect('/goods/' + goods._id);
//            });
//        });
//    } else {
//        _goods = new Goods({
//            productName: goodsObj.productName,
//            salePrice: goodsObj.salePrice,
//            productImage: goodsObj.productImage
//        });
//        _goods.save(function(err, goods) {
//            if (err) {
//                console.log(err);
//            }
//            res.redirect('/GoodsList');
//        });
//    }
//});
////
////// 5.电影真正的更新地址
////app.get('/admin/movie', function(req, res) {
////    res.render('admin', {
////        title: '后台管理',
////        movie: {
////            title: ' ',
////            doctor: ' ',
////            country: ' ',
////            year: ' ',
////            language: ' ',
////            summary: ' ',
////            poster: ' ',
////            flash: ' '
////        }
////    });
////});
////
//// 6.商品列表页路由
//app.get('/GoodsList', function(req, res) {
//    Goods.fetch(function(err, goods) {
//        if (err) {
//            console.log(err);
//        }
//        res.render('GoodsList', {
//            title: '商品列表页面',
//            index:'返回首页',
//            btn:'添加商品',
//            goods: goods
//        });
//    });
//
//});
////
//// 7.用户注册页路由
//app.post('/user/registe',function(req,res){
//    var _user = req.body.user; //拿到表单提交的user数据
//    User.findOne({name: _user.name}, function(err, user){//判断用户名是否被占用
//        if(err){
//            console.log(err);
//        }
//        if(user){
//            return res.redirect('/');
//        }
//        else{
//            user = new User(_user); //直接生成用户数据
//            user.save(function(err, user){
//                if(err){
//                    console.log(err);
//                }
//                res.redirect('/');
//            });
//        }
//    });
//});
////
//// 8.用户列表页路由
//app.get('/userList',function(req,res){
//    User.fetch(function(err,users){
//        if(err){
//            console.log(err);
//        }
//        res.render('Userlist',{
//            title:'用户列表页面',
//            index:'返回首页',
//            btn:'添加用户',
//            users:users
//        });
//    });
//});
//
//// 9.用户登录路由
//app.post('/user/login',function(req,res){
//    var _user=req.body.user;
//    var userName=_user.userName;
//    var userPassword=_user.userPassword;
//    User.findOne({userName:userName,userPassword:userPassword},function(err,user){
//        if(err){
//            console.log(err);
//        }
//        if(!user){ //用户不存在或者密码错误
//            console.log("用户不存在或者密码错误");
//            return res.redirect('/');
//        }else{
//            req.session.user=user;
//            console.log("登录成功");
//            return res.redirect('/GoodsList');
//        }
//    });
//});
//
// 10.登出功能log out
app.get('/logout',function(req,res){
    delete req.session.user;
    delete app.locals.user;
    res.redirect('/');
});
// 11.删除的请求
app.delete('/admin/movie/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});