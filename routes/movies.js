var express = require('express');
const { route } = require('.');
var router = express.Router();
const movieCtrl = require('../controllers/movies');
/* GET users listing. */
router.get('/new', movieCtrl.new);


module.exports = router;
