const router = require('express').Router();
const tripsController = require("../controllers/tripsController");

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
router.get("/", authCheck, (req,res) => {
	// res.send("Hello World");
  res.render('trips', {user: req.user});
});
 
//for React returns json objects
// Matches with "/api/trips"
router
  .route("/")
  .get(tripsController.findAll)
  .post(tripsController.create);

//Matches with "/api/trips/:id"
router
  .route("/:id")
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

module.exports = router;