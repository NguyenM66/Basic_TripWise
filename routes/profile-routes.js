const router = require('express').Router();

const authCheck = (req,res,next) => {
	if(!req.user){
		//if user is not logged in
		res.redirect('/auth/login');
	}else {
		//if user is logged in go to next piece of middleware
		next();
	}
};

//To see server side if user data is being rendered
router.get('/', authCheck, (req,res) => {
	res.render('profile', {user: req.user});
});

//for React returns json object with user data
router.get("/me", authCheck, (req,res) => {
	res.json(req.user)
})

module.exports = router;