const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// Implementing a One to Many Relationship
// One movie has Many Reviews, a review belongs to a movie
// embed reviews in movies, since the reviews will always shown with A movie (show page)

// define the embedded schema in the model file it will be embedded ( left hand side of your relationship - 'One movie has many reviews')
const reviewSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

// The purpose of the schema is to enforce the shape
// of our documents in our movies Collection (Movie)
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  nowShowing: Boolean,
  // This is setting up referencing (In this particular case we are setting up a MANY TO MANY RElationship with performers)
  cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}], // <- Performer is matching = mongoose.model('Performer', performerSchema); "THE NAME OF THE MODEL IS Performer"

  // embedding the reviews in A movie
  reviews: [reviewSchema] // every review that is inside of the reviews array will look like the reviewSchema
});

// movies collection (if you looked in mongdob, after you put something in it!)
module.exports = mongoose.model("Movie", movieSchema);

// THE POINT OF THIS FILE
// Is to create our model and export it
// OUr model can perform CRUD operations on our database
// typically we import the model in our controllers to use it
