// getting router 
const router = require("express").Router();
const {User}=require("../models/userSchema");
const dotenv=require("dotenv");



router.post("/", async(req,res)=>{
    try{
          const query = {};
          query[req.body.varname] = req.body.varval;
          const user = await User.findOne(query);

          if (user) {
            res.json({ exists: true });
          } else {
            res.json({ exists: false });
          }
        } 
         catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
})


// router to find many user and its details 

router.post("/findusers", async(req,res)=>{
  console.log("inside findusers");
  try{
        const query = {};
        query[req.body.searchBy] = req.body.searchInp;
        const users = await User.find(query);

        if (users) {
          res.json(users);
          console.log(users);
        } else {
          res.json({ message: 'Unable to find ' });
        }
      } 
       catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})




module.exports=router;