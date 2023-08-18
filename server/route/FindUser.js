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



module.exports=router;