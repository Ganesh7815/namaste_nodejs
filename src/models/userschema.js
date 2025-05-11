const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
    firstName :{
        type:String
    },secondName:{
        type:String
    },Email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
});

const User=mongoose.model("User",userSchema);
module.exports={User};