var mongoose = require('mongoose');
//引入模式这个文件

var GoodsSchema = require('../schemas/goods');
var Goods = mongoose.model('Goods',GoodsSchema);

// 将模式导出
module.exports = Goods;