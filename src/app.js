const express=require("express");

const app=express();



app.get("/user",(req,res)=>{
    res.send({"firstName":"ganesh","second name":"machavarapu"});
})

app.post("/user",(req,res)=>{
    // console.log("deleting the user");
    res.send("user is posted successsfully");
    
})

app.delete("/user",(req,res)=>{
    res.send("user is deleted successfully");
})


app.use("/test",(req,res)=>{
    res.send("this is test page u know");
});



app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
})