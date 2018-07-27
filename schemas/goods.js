var mongoose=require('mongoose');

//关于这个Schema文件，主要为实例化为模型做准备，在没有实例化为model之前，没有办法操纵数据库
var GoodsSchema=new mongoose.Schema({
    productName:{
        unique:true,
        //唯一的
        type:String
    },
    salePrice:Number,
    productImage:String,
    checked:String,
    productNum:Number
});

// 定义静态方法，静态方法在Model层就能够使用
GoodsSchema.statics={
    // 用fetch方法获取所有的数据
    fetch:function(callback){
        return this
            .find({})
            .exec(callback);
    },
    findById:function(id,callback){
        return this
            .findOne({_id:id})
            .exec(callback);
    }
};
module.exports=GoodsSchema;