const router = require("express").Router();
const Drive = require("../models/driveSchema");
const { User } = require("../models/userSchema");

const generateCode = (name, year) => {
    const firstFourLetters = name.slice(0, 4).toUpperCase();
    const lastTwoDigitsOfYear = year.toString().slice(-2);
    const randomFourDigitNumber = Math.floor(Math.random() * 9000) + 1000;

    const code = `${firstFourLetters}${lastTwoDigitsOfYear}NK${randomFourDigitNumber}`;
    return code;
}

router.post("/", async (req, res) => {

    try {
        dname = req.body.name;
        dyear = req.body.year;

        const drivecode = generateCode(dname, dyear)

        const drive = Drive({ ...req.body, drivecode });
        await drive.save(); 

        const users = await User.find();

        for (const user of users) {
            user.drives.push({drivecode})
            await user.save();
        }

        res.status(201).json({ message: "Drive created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
    }

})

module.exports = router;