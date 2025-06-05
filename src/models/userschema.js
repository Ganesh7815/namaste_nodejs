const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const userSchema  = mongoose.Schema({
    firstName :{
        type:String,
        required:true
    },secondName:{
        type:String
    },email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("invalid email"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:80,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("plz enter the strong password"+value);
            }
        }

    },
    age:{
        type:Number
    },
    photoUrl:{
        type:String,
        default:"https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg",
        validate(value){
            if(!validator.isURL(value))
            {
                throw new Error("plz enter the valid url"+value);
            }
        }
    },
    about:{
        type:String,
        defalut:"this is for biosection,required to update plz"
        
    },
    gender:{

        type:String,
        validate(value)
        {
            if(!["male","female","others"].includes(value))
            {
                throw new error;
            }
        }

    },
    skills:{
        type:[String]
    }



},
 {timestamps: true});


 userSchema.methods.getJWT = function () {
    const user = this;
    const token= jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"});
    return token;
    
 }

 userSchema.methods.isvaliduser = function (inputuserpassword) 
 {
    const user=this;
    const isvalid = bcrypt.compareSync(inputuserpassword,user.password);
    return isvalid;
 }
const User=mongoose.model("User",userSchema);
module.exports={User};