// import the Movie Model in order to perform CRUD
// operations on the database
const Movie = require('../models/movie');

module.exports = {
	new: newMovie,
	create
}

function create(req, res){
	// console.log(req.body, ' contents of the form');
	// update 
	req.body.nowShowing = !!req.body.nowShowing;
	console.log(req.body, ' after');

	// THe server now tells the Model 
	// to take the contents of the form (req.body) sent from the client
	// and put it in the database 
	Movie.create(req.body, function(err, movieDoc){
		if(err){
			console.log('======================err')
			console.log(err);
			console.log('==========================================')

			res.send('err creating check the terminal')
		}
		console.log('=============== Below is the movieDoc from the db');
		console.log(movieDoc);
		console.log('==========================================')

		// respond to the client
		res.redirect('/')
	}); // end of the callback function in Movie.create


} // end of the create controller function

function newMovie(req, res){
	res.render('movies/new')
}

