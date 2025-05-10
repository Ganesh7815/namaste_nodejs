const express=require("express");

const app=express();

app.use("/test",(req,res,next)=>{
    console.log("this is route1");
    // res.send("this is resonpse1");
    next();
},(req,res,next)=>{
    console.log("this is route2");
    // res.send("this is respone 2");
   
},(req,res,next)=>{
    console.log("this is route3");
    // res.send("this is respone 3"); 
    next();
})


app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
})