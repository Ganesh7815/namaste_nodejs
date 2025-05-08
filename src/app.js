const express=require("express");

const app=express();


app.use("/test",(req,res)=>{
    res.send("this is test page u know");
});


app.use("/",(req,res)=>{
    res.send("this is home or dashboard");
});
// app.use((req,res)=>{
//     res.send("this is first project"); //this is request hander
// })
app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
})