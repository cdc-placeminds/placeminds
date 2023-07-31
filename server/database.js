const mongoose = require("mongoose");
require ("dotenv").config();


module.exports = () => {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const uri = 'mongodb+srv://'+ process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@cluster0.7gseivw.mongodb.net/firstdatabase?retryWrites=true&w=majority'
    
    try {
        mongoose.connect(uri, connectionParams);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
        console.log("Connection Unsuccessful");
    }

}