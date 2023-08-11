const router = require("express").Router();
const Drive = require("../models/driveSchema");

router.post("/", async(req,res)=> {

    try {
        await Drive({...req.body}).save();
        res.status(201).json({ message: "Drive created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
    }

})

module.exports = router;