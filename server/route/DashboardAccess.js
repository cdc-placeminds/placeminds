const router = require("express").Router();
const authenticate = require("../middleware/authenticate");



router.get('/', authenticate, (req, res) => {
	
	res.send({
		userDatasB: req.rootUser,
		driveData: req.driveDetail
	});

})

module.exports = router
