

// middleware function for our routes that check to see if the user is logged in or not!

module.exports = function isLoggedIn(req, res, next){

	// check is the requse authenticated (aka are they lgged in) if they are just process the request
	if(req.isAuthenticated()) return next();

	// redirect them to start the oauth process to authenticated
	res.redirect('/auth/google')
}

// IMPORT THIS FUNCTION in any of your routes to set up authorization, 
// check movie routes for example!