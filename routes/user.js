var express = require('express');
var router = express.Router();
var User = require('../models/user');

//报错信息公共函数
function errJSON(err) {
    if(!err) {
        return {
            status: '1',
            msg: '',
            result: ''
        }
    } else {
        return {
            status: '1',
            msg: err.message,
            result: ''
        }
    }
}
//用户登录
router.post('/login', function(req, res, next) {
    console.log(req.body.userName);
    var param = {
        userName: req.body.userName,
        userPassword: req.body.userPassword
    };
    User.findOne(param, function(err, user) {
        if(err) {
            res.json(errJSON(err));
        } else {
            if(user) {
                //存在cookie里
                res.cookie('userId', user.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie('userName', user.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                //req.session.user=doc
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: user.userName
                    }
                });
            } else {
                res.json({
                    status: '2',
                    msg: '',
                    results: '用户名不存在'
                });
            }
        }
    })
});

module.exports = router;