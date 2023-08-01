const router = require("express").Router();
const authenticate = require("../middleware/authenticate");



router.get('/', authenticate, (req, res) => {
    
    console.log("Hello Working")
	res.send(req.rootUser);
})



module.exports = router
