const router = require("express").Router();
const Drive = require("../models/driveSchema");
const { User } = require("../models/userSchema");

router.post("/", async (req, res) => {

    try {

        const { datadrive, userData } = req.body;

        // Find the user by ID or another unique identifier
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the drive in the user's drives array and update the 'applied' field to true
        const driveIndex = user.drives.findIndex(d => {
            return d.drivecode === datadrive.drivecode;
        });
        if (driveIndex !== -1) {
            user.drives[driveIndex].applied = true;
            await user.save();
        }
        else {
            return res.status(404).json({ message: "Error" });
        }

        res.status(201).json({ message: "Update successfull" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
    }

})

module.exports = router;