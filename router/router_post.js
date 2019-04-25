const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

router.get('/admin/post/addpost',(req,res)=>{
    db.query('select * from ali_cate',(err,result)=>{
        res.render(path.join(rootPath,'view/admin/post','addpost.html'),{list:result});
    })
});
router.get('/admin/post/posts',(req,res)=>{
    db.query('select * from ali_cate',(err,result)=>{
        res.render(path.join(rootPath,'view/admin/post','posts.html'));
    })
});
module.exports = router;