const dotenv = require("dotenv")

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRoutes = require("./route/users");
const authRoutes = require("./route/auth");
const driveRoutes = require("./route/drive");
const DashboardAccess = require("./route/DashboardAccess");
const GoogleAPI = require("./route/googleapi");
const ApplyAPI = require("./route/applyapi");
const UpdateApply = require("./route/updateapply");
const FindAPI = require("./route/findapi")
const SheetNames = require("./route/sheetnames")
const cookieParser = require("cookie-parser");
const Mailsender = require("./route/Mailsender")
const FindUser = require("./route/FindUser");
const ResetPassword = require("./route/ResetPassword");

// database connection 
connection();

//Middlewares
app.use(express.json());
app.use(cookieParser());

// Define the CORS configurations
const corsOptionsDevelopment = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const corsOptionsProduction = {
  origin: ['https://placeminds-frontend.vercel.app'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};


// Use CORS middleware based on the environment
if (process.env.NODE_ENV === 'development') {
  app.use(cors(corsOptionsDevelopment));
} else {
  app.use(cors(corsOptionsProduction));
}




//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/drive", driveRoutes);
app.use("/api/dashboard", DashboardAccess)
app.use("/api/googleapi", GoogleAPI)
app.use("/api/applyapi", ApplyAPI)
app.use("/api/updateapply", UpdateApply)
app.use("/api/findapi", FindAPI)
app.use("/api/sheetnames", SheetNames)
// api for sending mail 
app.use("/api/mailsend", Mailsender);
// for checking if user exist 
app.use("/api/check-user", FindUser);
// for reset password 
app.use("/api/resetpassword", ResetPassword);


//Listen to port
const port = 8080;
app.listen(port, () => {
  console.log(`Listening to the Port ${port}`)
})