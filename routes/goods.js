var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');

router.get('/GoodsList', function(req, res) {
    Goods.fetch(function(err, goods) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: "后台管理系统首页",
            goods: goods
        });
    });
});

module.exports = router;