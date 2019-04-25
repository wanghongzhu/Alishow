const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

const cate_c = require('../controller/controller_cate');
router.get('/admin/index',cate_c.cate)

router.get('/admin/login',(req,res)=>{
    res.render(path.join(rootPath,'view/admin','login.html'));
})

router.get('/admin/cate/addcate',(req,res)=>{
    res.render(path.join(rootPath,'view/admin/cate','addcate.html'));
})

router.post('/admin/cate/addCateDeal',(req,res)=>{
    const obj = {
        cate_name:req.body.name,
        cate_icon:req.body.icon,
        cate_addtime:moment().format('YYYY-MM-DD')
    };
    const sql = 'insert into ali_cate set ?';
    db.query(sql,obj,(err,result)=>{
        if(err||result.affectedRows!=1){
            return console.log(err);
        }
        res.redirect('/admin/cate/cate');
    })
});

router.get('/admin/cate/cate',(req,res)=>{
    res.render(path.join(rootPath,'view/admin/cate','cate.html'));
})
router.get('/admin/cate/getCate',cate_c.getCate);
router.get('/admin/cate/delcate',(req,res)=>{
    const data = req.query.delId;
    const sql = 'delete  from ali_cate where cate_id = ?';
    db.query(sql,data,(err,result)=>{
        if(err||result.affectedRows!=1){
            return res.send({code:201,message:'您要删除的数据走丢了'});
        }
        res.send({code:200,message:'删除成功'});
    })
});
router.get('/admin/cate/editcate',(req,res)=>{
    const data1 = req.query.id;
    const sql = 'select * from ali_cate where cate_id = ?';
    db.query(sql,data1,(err,result)=>{
        if(err||result.length!=1){
            return res.render(path.join(rootPath,'view/admin/cate','editcate.html'),{code:201,message:'您要编辑的数据走丢了'});
        }
        res.render(path.join(rootPath,'view/admin/cate','editcate.html'),result[0]);
    });
})
router.post('/admin/cate/modifycate',(req,res)=>{
    const obj = {
        cate_name:req.body.name,
        cate_icon:req.body.icon
    }
    const dataEdit = req.body.idEdit;
    const sql = 'update ali_cate set ? where cate_id =?';
    db.query(sql,[obj,dataEdit],(err,result)=>{
        if(err||result.affectedRows!=1){
            return res.send({code:201,message:'修改内容失败'});
        }
        res.send({code:200,message:'修改内容成功'})
    });
})
module.exports = router;