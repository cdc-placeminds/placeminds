const dotenv = require("dotenv")

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRoutes = require("./route/users");
const authRoutes = require("./route/auth");

// database connection 
connection();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//Listen to port
const port = 8080;
app.listen(port, () => {
    console.log(`Listening to the Port ${port}`)
})