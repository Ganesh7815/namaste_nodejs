const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
    firstName :{
        type:String,
        required:true
    },secondName:{
        type:String
    },Email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:80

    },
    age:{
        type:Number,
        min:18
    },
    photoUrl:{
        type:String,
        default:"https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg",
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

const User=mongoose.model("User",userSchema);
module.exports={User};