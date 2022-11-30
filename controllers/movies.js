// import the Movie Model in order to perform CRUD
// operations on the database
const Movie = require('../models/movie');

module.exports = {
	new: newMovie,
	create, 
	index,
	show
}


function show(req, res) {
	// Movie is our model
	// Movie Model go find the movieDocument with this id (req.params.id, from the a tag http get request from the index page) 
	Movie.findById(req.params.id, function(err, movieDoc) {
		console.log(movieDoc)
		// responding to the clinet, and passing in the movieDoc as a variable called movie into the show page
	  res.render('movies/show', { title: 'Movie Detail', movie: movieDoc });
	});
  }

function index(req, res){

	// Tell the model, 
	// to go get ALL of the movies from 
	// the database Movie is our model
	Movie.find({}, function(err, movieDocs){
		// moviesDocs is all of the movies
		// from our collection in mongodb!
		console.log(movieDocs)

		// respond to the client inside the callback of the model 
		res.render('movies/index', {movies: movieDocs, name: 'jim'})
	})

	
}
function create(req, res){
	// console.log(req.body, ' contents of the form');
	// update 
	req.body.nowShowing = !!req.body.nowShowing;
	console.log(req.body, ' after');

	// remove the white space in the string
	req.body.cast = req.body.cast.replace(/\s*, \s*/g, ',')
	req.body.cast = req.body.cast.split(',')

	// THe server now tells the Model 
	// to take the contents of the form (req.body) sent from the client
	// and put it in the database 

	

	Movie.create(req.body, function(err, movieDoc){
		if(err){
			console.log('======================err')
			console.log(err);
			console.log('==========================================')

			return res.send('err creating check the terminal')
		}
		console.log('=============== Below is the movieDoc from the db');
		console.log(movieDoc);
		console.log('==========================================');

		// respond to the client
		res.redirect('/movies')
	}); // end of the callback function in Movie.create


} // end of the create controller function

function newMovie(req, res){
	res.render('movies/new')
}

