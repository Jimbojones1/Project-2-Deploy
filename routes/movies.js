var express = require('express');
var router = express.Router();
const movieCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth')


/* GET users listing. */
router.get('/new', isLoggedIn, movieCtrl.new);
router.get('/', movieCtrl.index);
router.post('/', isLoggedIn, movieCtrl.create);
// :id is a param it will capture anything after 
// /movies in a request
//GET /movies/62f140839bff57a1d26d9761
// param would be 62f140839bff57a1d26d9761
// I can access the param using req.params in the show controller function
router.get('/:id', movieCtrl.show);


module.exports = router;
