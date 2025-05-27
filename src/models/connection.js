const mongoose = require("mongoose");
const {User} = require("../models/userschema");
const connection = mongoose.Schema({
    
    fromIdFrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },

   toIdFrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },

    status:{
        type:String,
        required:true,
        enum:["ignored","interested","accepted","rejected"]
    }

},{Timestamp:true});

connection.index({status:-1,toIdFrom:1});
const Connection = mongoose.model("Connection",connection);
module.exports = {Connection};