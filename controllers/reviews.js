

module.exports = {
	create
}

// creating a review
function create(req, res){

	console.log(req.body);
	console.log(req.params.id, ' <req.params.id')


	res.redirect(`/movies/${req.params.id}`)
}