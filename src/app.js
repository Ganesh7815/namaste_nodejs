const express=require("express");
const {dbconncetion} = require("./config/databases");
const {User} = require("./models/userschema");
const app=express();


app.post("/user",async (req,res)=>{
    userobj={
        firstName:"Surya",
        secondName:"Machavarapu",   //this is the instance of the user
        email:"machavarapusurya2004",
        password:"23456",
        age:18
    }

   const user =new User(userobj);
   try{
      await user.save();
     res.send("succssfully added the user details");
   }catch(err)
   {
     res.status(404).send("user data not updated");
     
   }

});
dbconncetion().then(()=>{
    console.log("database connection is estalbished");
    app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
    })
}).catch(err=>{
    console.log("error is occred");
})
