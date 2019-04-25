const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

router.get('/admin/center/profile',(req,res)=>{
    const data = req.session.userInfo.admin_id;
    const sql = 'select * from ali_admin where admin_id = ?';
    db.query(sql,data,(err,result)=>{
        res.render(path.join(rootPath,'view/admin/center','profile.html'),result[0]);
    });
});
router.get('/admin/center/profile_my',(req,res)=>{
    const data = req.session.userInfo.admin_id;
    const sql = 'select * from ali_admin where admin_id = ?';
    db.query(sql,data,(err,result)=>{
        res.send(result[0])
    });
});
router.get('/admin/center/password_reset',(req,res)=>{
    // const data = req.session.userInfo.admin_id;
    // const sql = 'select * from ali_admin where admin_id = ?';
    // db.query(sql,data,(err,result)=>{
    // });
    res.render(path.join(rootPath,'view/admin/center','password-reset.html'));
});
module.exports = router;