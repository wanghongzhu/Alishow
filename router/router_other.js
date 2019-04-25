const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');

router.get('/admin/other/slides',(req,res)=>{
    res.render(path.join(rootPath,'view/admin/other','slides.html'))
});
module.exports = router;