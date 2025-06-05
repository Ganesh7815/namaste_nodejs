const {User} = require("../models/userschema");
const {validation} = require("../utils/validation");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");

router.post("/signup",async (req,res)=>{
    // userobj={
    //     firstName:"Surya",
    //     secondName:"Machavarapu",   //this is the instance of the user
    //     email:"machavarapusurya2004",
    //     password:"23456",
    //     age:18
    // 
    
   try{
      validation(req);

      const {firstName,secondName,email,password} = req.body;
     const hashpassword = bcrypt.hashSync(password, 10);
      console.log(hashpassword);
      
      const user =new User({
        firstName,
        secondName,
        email,
        password:hashpassword
      });
      const updateduser =  await user.save();
      const token = user.getJWT();
     res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
});

    
    res.status(202).json({data:user});
   }catch(err)
   {
     res.status(404).json({error:err.message});
     
   }

});


router.post("/login",async (req,res)=>{
  
  try{
         const {email,password}  = req.body;
    const user =await User.findOne({email:email});
    if(!user)
    {
       throw new Error("Invalid credationals");
    }

    const isvalid = user.isvaliduser(password);
    if(!isvalid)
    {
        throw new Error("Invalid credationals");
    }

    const token = user.getJWT();
     res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None", 
  maxAge: 24 * 60 * 60 * 1000,
});

    
    res.status(202).json({data:user});
    }catch(err)
    {
       res.status(402).json({error:err.message});
    }

});

router.post("/logout",(req,res)=>{

    res.cookie("token",null,{expires:new Date(now())});
    res.status(202).json({message:"logout successfully"});
});


module.exports = router;
