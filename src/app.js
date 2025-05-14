const express=require("express");
const {dbconncetion} = require("./config/databases");
const {User} = require("./models/userschema");
const { ReturnDocument } = require("mongodb");
const app=express();

app.use(express.json());

app.patch("/user", async (req, res) => {
  try {
    const userdata = req.body;
    
     const allowed_fields = ["secondName", "age", "about", "skills", "photoUrl"];
    const isAllowed = Object.keys(updates).every((key) =>
      allowed_fields.includes(key)
    );

    if (!isAllowed) {
      return res.status(400).send("Invalid fields in request body.");
    }
    const { Email } = req.body;
    if (!Email) {
      return res.status(400).send("Email is required to update user data.");
    }

    const userUpdated = await User.findOneAndUpdate({ Email }, userdata, {
      runValidators: true,
      new: true,
    });

    if (!userUpdated) {
      return res.status(404).send("User not found.");
    }

    res.send("Successfully updated.");
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again. " + err.message);
  }
});

app.delete("/user",async (req,res)=>{
   try{
      const userid=req.body.id;
      const deleteduser= await User.findByIdAndDelete({_id:userid});
      if(!deleteduser)
      {
          return res.send("user not found");
      }
      res.status(404).send("succssfully deleted the user");
   }catch(err){
    res.status(505).send("something went wrong");
   }
});

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

app.post("/user",async (req,res)=>{
    // userobj={
    //     firstName:"Surya",
    //     secondName:"Machavarapu",   //this is the instance of the user
    //     email:"machavarapusurya2004",
    //     password:"23456",
    //     age:18
    // }
    
    
   const user =new User(req.body);
   try{
      await user.save();
     res.send("succssfully added the user details");
   }catch(err)
   {
     res.status(404).send("user data not posted"+err.message);
     
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
