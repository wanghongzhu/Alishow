const path = require('path');
const db = require('../db.js');
const moment = require('moment');
let index = (req,res)=>{
    const sql = `select * from ali_pic;
                select * from ali_cate;
                select * from ali_article order by rand() limit 0,5;
                select * from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
                select * from ali_article join ali_admin on article_adminid=admin_id join  
                ali_cate on article_cateid=cate_id limit 0,3`
    db.query(sql,(err,result)=>{
        data = {
            pic:result[0],
            cate:result[1],
            rand:result[2],
            focus:result[3],
            newly:result[4]
        }
        res.render(path.join(rootPath,'view','index.html'),data);
    })
};
let list = (req,res)=>{
    const id = req.query.id;
    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select cate_name from ali_cate where cate_id = ${id};
                 select ali_article.*,ali_admin.admin_nickname from ali_article
                 join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                 where article_cateid = ${id}`
    db.query(sql,(err,result)=>{
        data = {
            cate:result[0],
            rand:result[1],
            name:result[2][0],
            article:result[3]
        }
        res.render(path.join(rootPath,'view','list.html'),data);
    })
}
let detail = (req,res)=>{
    const id = req.query.id;
    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select article_title from ali_article where article_id = ${id};
                 select ali_cate.cate_name,ali_admin.admin_nickname,ali_article.* from ali_article
                 join ali_cate on ali_cate.cate_id = ali_article.article_cateid
                 join ali_admin on ali_admin.admin_id = ali_article.article_adminid
                 where article_id = ${id}
                 `
    db.query(sql,(err,result)=>{
        data = {
            cate:result[0],
            rand:result[1],
            article_name:result[2][0],
            article_detail:result[3][0]
        }
        res.render(path.join(rootPath,'view','detail.html'),data);
    })
}
module.exports = {
    index,
    list,
    detail
}