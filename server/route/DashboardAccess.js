const router = require("express").Router();
const authenticate = require("../middleware/authenticate");



router.get('/', authenticate, (req, res) => {
	res.send(req.rootUser);
})


module.exports = router
