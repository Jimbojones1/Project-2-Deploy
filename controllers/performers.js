const Performer = require('../models/performer');
const Movie = require('../models/movie');
const movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

// This function is associating a peformer with a Movie
// Many to many relationship
function addToCast(req, res){

  // req.params.id represents the movies id, check the performers routers, 
  // and look at the form on the movie show page for the performers, thats where we are defining the value of :id 
  Movie.findById(req.params.id, function(err, movieDoc){
    // add performerId to the movieDoc's cast array
    movieDoc.cast.push(req.body.performerId); // req.body, is the contents of the form, performerId is the name property at that form
    // mutating a document ^ what do we have to do!
    // save, to tell the database that we changed the document
    movieDoc.save(function(err){
      // redirect back to the show page!
      res.redirect(`/movies/${movieDoc._id}`)
    })
  })

}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    // console.log(performer, '')
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}