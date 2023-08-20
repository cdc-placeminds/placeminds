const router = require("express").Router();
const Drive = require("../models/driveSchema");
const { User } = require("../models/userSchema");

/* Function to generate unique drivecode for each drive, which is of format
    First four letters of Company name + Last two digits of Year for which drive is, Alphabet NK, 4 digit random no */
const generateCode = (name, year) => {
    const firstFourLetters = name.slice(0, 4).toUpperCase();
    const lastTwoDigitsOfYear = year.toString().slice(-2);
    const randomFourDigitNumber = Math.floor(Math.random() * 9000) + 1000;

    const code = `${firstFourLetters}${lastTwoDigitsOfYear}NK${randomFourDigitNumber}`;
    return code;
}

router.post("/newdrive", async (req, res) => {

    try {
        //Getting name and year from request to generate unique code
        dname = req.body.name;
        dyear = req.body.year;

        //Calling function to generate unique code
        const drivecode = generateCode(dname, dyear)

        //Adding body + drivecode to database
        const drive = Drive({ ...req.body, drivecode });
        await drive.save();

        /* Getting all users from database, to update this drive's drivecode to users 
        drives array to check whether user has applied or not to drive */
        const users = await User.find();

        //Adding drive code to each users drives array, by iterating through every user and save the data
        for (const user of users) {
            user.drives.push({ drivecode })
            await user.save();
        }

        //Sending response of successfully drive creation
        res.status(201).json({ message: "Drive created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

})

router.post("/totalapplied", async (req, res) => {

    try {
        dcode = req.body.datadrive.drivecode;

        const drive = await Drive.findOne({
            drivecode: dcode
        })

        drive.totalapplied += 1
        drive.save();

        res.status(201).json({ message: "Drive created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

})


module.exports = router;