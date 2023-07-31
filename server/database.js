const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require ("dotenv").config();


module.exports = () => {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const uri = 'mongodb+srv://'+ process.env.SALT+':'+process.env.MONGO_PASS+'@cluster0.7gseivw.mongodb.net/firstdatabase?retryWrites=true&w=majority'
    
    console.log(uri)
    
    try {
        mongoose.connect(uri, connectionParams);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
        console.log("Connection Unsuccessful");
    }

}