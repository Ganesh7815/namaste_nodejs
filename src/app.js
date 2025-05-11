const express=require("express");

const app=express();

app.use("/getdata",(req,res)=>{
    try{
        throw new Error("this is error");
        res.send("user data to fetached");
    }catch(err){
        res.status(500).send("error is occred ,plz contact admin");
    }
})

this is a wildcard error handing
app.use("/",(err,req,res,next)=>{
    if(err)
    {
        console.log("this is error occured");
        res.send("sorry for this inconvincence");
    }
})
app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
})