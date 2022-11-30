//import the Movie model to talk to the database!
const Movie = require("../models/movie");

module.exports = {
  create,
};

// creating a review
function create(req, res) {
  // first check the contents of the form
  // console.log('========================');
  // console.log(req.body, " <- content of the form");
  // console.log('=========================')
  // // check for the movie id in the params
  // console.log('========================');
  // console.log(req.params.id, ' <req.params.id aka(the movie id)')
  // console.log('========================');

  // NOW We need to use our model to take the contents of the form (req.body)
  // and put them in the database

  // One Movie to many reviews
  // adding a review to A movie

  // 1. Find the movie we want to add the review!
  // req.params.id is the movie id
  Movie.findById(req.params.id, function (err, movieDoc) {
    if (err) {
      console.log(err, " <- err from Movie.findById callback");
      return res.send("error from create reviews check the terminal");
    }

    console.log("========================");
    // found movie from the database that we want to add the review (req.body) to!
    console.log(movieDoc, " <- movie from the database!");
    console.log("========================");

    // 2. add the review to the movieDocuments reviews array
    // req.body (contents of the form), which in this case represents a review!
    movieDoc.reviews.push(req.body);
    // since movieDoc is a document and we're mutating it (changing it, adding something to reviews array)
    // we need to tell the database, so to tell database we call `.save() on the movieDoc
    movieDoc.save(function (err) {
      // respond to the clinet
	//   console.log(movieDoc)
	  console.log(err, " <_ err from movieDoc.save callback")
      // respond to the client in the callback
	  // go back to the show page that the form was submitted from
	  // so you can check the movie from the database in the show controller
      res.redirect(`/movies/${req.params.id}`);
    });
  });
}
