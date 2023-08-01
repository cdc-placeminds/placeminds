const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const dotenv = require("dotenv");

const authenticate = async(req,res,next) => {

    try {
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
        // console.log(verifyToken)

        const rootUser = await User.findOne({_id: verifyToken._id});

        if(!rootUser){
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorised")
        console.log(error)
    }

}

module.exports = authenticate