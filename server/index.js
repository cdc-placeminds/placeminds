const dotenv = require("dotenv")

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRoutes = require("./route/users");
const authRoutes = require("./route/auth");
const driveRoutes = require("./route/drive")
const DashboardAccess = require("./route/DashboardAccess");
const cookieParser = require("cookie-parser");

// database connection 
connection();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/createdrive", driveRoutes);
app.use("/api/dashboard", DashboardAccess)

//Listen to port
const port = 8080;
app.listen(port, () => {
    console.log(`Listening to the Port ${port}`)
})