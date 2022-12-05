require('dotenv').config(); // this will allow us to read the variables from the .env file!
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const performersRouter = require('./routes/performers');

const app = express();

// require the database
require('./config/database') // this executes the database file, which establishes the connection with the db
require('./config/passport'); // <- require your configuration

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

// Passport needs to be after the session and before our controllers
app.use(passport.initialize());
app.use(passport.session());
// this middleware function that has to be after the passport
// because we need req.user to be availiable
app.use(function(req, res, next){
  // res.locals, is an object that we can attach a property too, 
  // and that property will become a variable in any ejs page that you have
  res.locals.user = req.user; 
  //<- req.user is from passport, so if the user is logged in, 
  //it will be the user document, if not req.user will undefined

  // inside of every single ejs page in your whole entire app will have 
  // a user variable, that will be undefined or be the users document (logged in)
  next()
})

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
