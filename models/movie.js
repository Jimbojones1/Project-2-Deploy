const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// The purpose of the schema is to enforce the shape 
// of our documents in our movies Collection (Movie)
const movieSchema = new Schema({
	title: String,
	releaseYear: Number,
	mpaaRating: String,
	cast: [String],
	nowShowing: Boolean
  });


  mongoose.Schema.Types.Boolean.convertToTrue.add('on');
  mongoose.Schema.Types.Boolean.convertToFalse.add(undefined);

  movieSchema.pre('validate', function (next, data) {
    console.log(data)
    console.log('this.nowShowing -> ', this); //undefined
    this.nowShowing = !!this.nowShowing;
    next();
  });

  // movies collection (if you looked in mongdob, after you put something in it!)
  module.exports = mongoose.model('Movie', movieSchema);


  // THE POINT OF THIS FILE
  // Is to create our model and export it
  // OUr model can perform CRUD operations on our database
  // typically we import the model in our controllers to use it