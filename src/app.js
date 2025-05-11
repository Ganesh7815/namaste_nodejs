const express=require("express");

const app=express();

const {authuser} = require("./middlewares/auth");

app.get("/admin/getAllData",authuser,(req,res,next)=>{
    // admin should be authriized before the operations to made
    res.send("this is data to sent");
})

app.get("/admin/deleteUser",authuser,(req,res,next)=>{
    res.send("succssfully user is deleted");
})

app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
})