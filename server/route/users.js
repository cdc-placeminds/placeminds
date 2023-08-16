const router = require("express").Router();
const Drive = require("../models/driveSchema");
const { User, validate } = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		//Validating if all fields are filled or not
		const { error } = validate(req.body);
		//All fields not filled properly
		if (error) {
			return res.status(422).json({ error: "Please Fill All Fields Properly" });
		}

		//Checking if email already exist
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(422).json({ error: "User with given email already Exist!" });
		}

		else {
			// Password Hashing
			const hashPassword = await bcrypt.hash(req.body.password, 10);

			//Updating Hashed Password and Saving in Database
			const drives = await Drive.find();

			const drivecodes = [];
			for (const drive of drives) {
				// console.log(drive.drivecode)
				drivecodes.push({drivecode: drive.drivecode, applied: false})
			}

			await new User({ ...req.body, password: hashPassword, drives: drivecodes}).save();
			res.status(201).json({ message: "User created successfully" });
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error)
	}
});

module.exports = router;