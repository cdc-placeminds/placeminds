const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');
const dotenv = require("dotenv")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    enrollment: {type: String, required: true},
    contact: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model('user', userSchema);

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

module.exports = {User, validate}