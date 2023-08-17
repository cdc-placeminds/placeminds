const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');
const dotenv = require("dotenv")

//Defining User Schema in Database
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    enrollment: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    drives: [
        {
            drivecode: { type: String, required: true },
            applied: { type: Boolean, default: false }
        }
    ]
})

//Generating or Creating JWT Token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
            expiresIn: "7d",
        });
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;
    }
    catch (error) {

        console.log(error)

    }
};

const User = mongoose.model('user', userSchema);


//Validating Data of User
const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        enrollment: Joi.string().required().label("Enrollment"),
        contact: Joi.string().required().label("Contact"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        cpassword: passwordComplexity().required().label("Password")
    });

    return schema.validate(data)
}

module.exports = { User, validate }