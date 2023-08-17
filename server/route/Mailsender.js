// getting router 
const router = require("express").Router();
const dotenv=require("dotenv");
const nodemailer=require("nodemailer");
const {User}=require("../models/userSchema");

var i =0;

// transporter for nodemail 

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS
    }
  });



router.post("/",async(req,res)=>{

  try{
    const user = await User.findOne({enrollment: req.body.text});
    
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: user.email,
        subject: req.body.subject,
        html: `
        <h1>Hello there!</h1>
        <h2>${user.name}</h2>
        <p>Enrollment: ${req.body.text}</p>
        <p> We are glad to Inform you attendance has been marked for drive</p>
        
        <p>Variable 2: ${req.body.subject}</p>
      `,
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
      i++;

        if (error) {
          console.log(error);
        } else {
            
          console.log("Email sent successfully for the "+i+" time !");
        }
      });
    





    
    console.log("inside mailsender router");

    console.log(req.body);
    }
    catch(error){
      console.log(error)
    }

})


module.exports=router