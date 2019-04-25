const path = require('path');
const db = require('../db.js');
const moment = require('moment');
let cate = (req,res)=>{
    res.render(path.join(rootPath,'view/admin','index.html'));
};
let getCate = (req,res)=>{
    const sql = 'select * from ali_cate order by cate_id';
    db.query(sql,(err,result)=>{
        if(err || result.length ==0){
            return res.send({code:201,message:'获取栏目列表数据失败'});
        }
        res.send({code:200,message:'获取栏目列表数据成功',data:result});
    })
};
module.exports = {
    cate,
    getCate,
}