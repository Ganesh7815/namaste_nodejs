const mongoose = require("mongoose");

const connection = mongoose.Schema({
    
    fromIdFrom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

   toIdFrom:{
        type:mongoose.Schema.Types.ObjectId,
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