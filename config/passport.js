const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
//Implement our strategy to authorize with google oauth

// Setup our Verify Callback, and this function will be called once a user logins
// via OAUTH

passport.use(
	new GoogleStrategy(
	  // Configuration object
	  {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK,
		scope: [ 'profile', 'email' ],
		state: false
	  },
	  // The verify callback function
	async function(accessToken, refreshToken, profile, cb) {
		// a user has logged in with OAuth...
		console.log('===========================');
		console.log(accessToken, ' accesstoken')
		console.log(refreshToken, ' this is refresh token')

		console.log('===========================')



		console.log('callback being called!!!!!')
		// You will have to write this logic for your project below
		try {
			// first check has this user logged into our app before?
			// search by the googleId property to see if the googleId exists in the database
			// if it does the user has logged in before
			let user = await User.findOne({googleId: profile.id});
			console.log(user, ' this is user!!!!')
			// if user document exists then pass the users information to the next middleware function
			// if the user doens't exist user will be undefined
			// the next place is passport.serializeUser which is located below
			if(user) return cb(null, user);  // cb(error, dataYouWantToPass), 
			//cb passes the information to the next middleware function

			// WE HAVE NEW USER, (if User.findOne) returned undefined
			// Create that User
			user = await User.create({
				name: profile.displayName,
				googleId: profile.id,
				email: profile.emails[0].value,
				avatar: profile.photos[0].value
			})

			console.log(user, ' user created')
			// once we create the user, pass the user to the next middleware function
			// the next place is passport.serializeUser which is located below
			return cb(null, user)


		} catch(err){
			return cb(err)
		}

	  }
	)
  );


  // this function gets called after the verify callback
  // cb(null, user) from the verify callback, is the function that passes the user to this function
  passport.serializeUser(function(user, cb){
	// add the user's id to the session id to track the logged in user
	// user is the user's document from the verify callback
	return cb(null, user._id)
  })


  // This function gets called on every request (besides login), clicking on a tag, typing in url bar
  // submitting a form, EVERY HTTP REQUEST FROM THE USER
  passport.deserializeUser(function(userId, cb){
	console.log(userId, ' this user id')
	// this functions opens up the session cookie, 
	//grabs the userId, ^ the argument userId, is from the session cookie
	// and will attach the users document to req.user, which will be availiable in every single controller function
	User.findById(userId, function(err, userDoc){
		if(err) return cb(err);

		console.log('insid deserialized uer', userDoc)
		return cb(null, userDoc); // this assigns the user document that we just found from the database to req.user
		// this is essentially doing req.user = userDoc
	})
  })