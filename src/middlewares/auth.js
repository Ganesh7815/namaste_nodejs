const jwt = require("jsonwebtoken");
const {User} = require("../models/userschema");
const cookieParser = require("cookie-parser");
const express = require("express");
app=express();

app.use(cookieParser());
const authuser=async (req,res,next)=>{
    try{
           const token = req.cookies.token;
           
            if(!token)
            {
                throw new Error("token is not valided");
            }

            const decode = jwt.verify(token,"Ganesh123@");
            const userid = decode.id;
            const userdata =await User.findById(userid);
            if(!userdata)
            {
                throw new Error("user not found");
            }
            req.user = userdata;  
            next();
    }catch(err)
    {
        res.send("Error : "+err.message);
    }

}

module.exports={authuser};