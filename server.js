require('dotenv').config(); // this will allow us to read the variables from the .env file!
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const performersRouter = require('./routes/performers');

const app = express();

// require the database
require('./config/database') // this executes the database file, which establishes the connection with the db

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_SECRET)
console.log(process.env.GOOGLE_CALLBACK)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// This will have to be before your controller routes and THE PASSPORT ROUTES!
// This helps us identify what client (Who is making a request)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
// for nested resources we typically just mount 
// at `/` because this no consitent prefix (refer to the routing guide)
app.use('/', reviewsRouter);
app.use('/', performersRouter); // many to many resource






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
