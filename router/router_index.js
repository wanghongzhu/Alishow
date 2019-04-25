const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

const index_c = require('../controller/controller_index');
router.get('/index',index_c.index);

router.get('/list',index_c.list);

router.get('/detail',index_c.detail);
module.exports = router;