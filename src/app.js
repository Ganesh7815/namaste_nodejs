const express=require("express");
const {dbconncetion} = require("./config/databases");
const {User} = require("./models/userschema");
const app=express();

app.use(express.json());

app.get("/user",async (req,res)=>{
 try{
     const usermail = req.body.email;
     console.log(req.body);
     
    const finduser = await User.findOne({Email:usermail});
    if(!finduser)
    {
     return res.send("no user found,plzmregister");
    }
     res.send(finduser);
 }catch{
     res.status(404).send("error occured,plz try again later");
 }
})

app.get("/feed", async (req, res) => {
  try {  
    const finduser = await User.findById({_id:"682282168051c6b395dc13d6"}); // Ensure 'Email' matches DB field
    
    if(finduser.length==0)
    {
      res.send("no user found,plz register");
    }
    res.send(finduser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});

// app.post("/user",async (req,res)=>{
//     // userobj={
//     //     firstName:"Surya",
//     //     secondName:"Machavarapu",   //this is the instance of the user
//     //     email:"machavarapusurya2004",
//     //     password:"23456",
//     //     age:18
//     // }
    
    
//    const user =new User(req.body);
//    try{
//       await user.save();
//      res.send("succssfully added the user details");
//    }catch(err)
//    {
//      res.status(404).send("user data not updated");
     
//    }

// });
dbconncetion().then(()=>{
    console.log("database connection is estalbished");
    app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
    })
}).catch(err=>{
    console.log("error is occred");
})
