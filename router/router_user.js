const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

router.get('/admin/user/users',(req,res)=>{
    db.query('select * from ali_admin  order by admin_id',(err,result)=>{
        if(err){
            return res.render(path.join(rootPath,'view/admin/user','users.html'),{code:201,message:'获取管理员列表失败'});
        }
        res.render(path.join(rootPath,'view/admin/user','users.html'),{list:result});
    });
});

router.get('/admin/user/adduser',(req,res)=>{
    db.query('select * from ali_admin',(err,result)=>{
        res.render(path.join(rootPath,'view/admin/user','adduser.html'));
    });
});
router.post('/admin/user/adduserdeal',(req,res)=>{
    const data = {
        admin_email:req.body.email, 
        admin_nickname:req.body.nickname, 
        admin_pwd:req.body.password, 
    }
    const sql = 'insert into ali_admin set ?';
    db.query(sql,data,(err,result)=>{
        if(err||result.affectedRows!=1){
            return res.send({code:201,message:'添加失败'});
        }
        res.send({code:200,message:'添加成功'});
    });
});

router.get('/admin/user/delusers',(req,res)=>{
    const data = req.query.id;
    const sql = `delete from ali_admin where admin_id in (${data})`;
    db.query(sql,(err,result)=>{
        if(err){
            return res.send({code:201,message:'批量删除失败'});
        }
        res.send({code:200,message:'批量删除成功'})
    });
});

router.get('/admin/user/edituser',(req,res)=>{
    const data = req.query.userid;
    console.log(data)
    const sql = 'select * from ali_admin where admin_id=?';
    db.query(sql,data,(err,result)=>{
        res.render(path.join(rootPath,'view/admin/user','edituser.html'),result[0]);
    });
});
router.post('/admin/user/modifyuser',(req,res)=>{
    const obj = {
        admin_email:req.body.email,
        admin_nickname:req.body.nickname,
        admin_pwd:req.body.password,
        admin_gender:req.body.gender
    };
    const id = req.body.id;
    const sql = 'update ali_admin set ? where admin_id=?';
    db.query(sql,[obj,id],(err,result)=>{
        if(err||result.affectedRows!=1){
            return res.send({code:201,message:'修改失败'});
        }
        res.send({code:200,message:'修改成功'});
    });

})
module.exports = router;