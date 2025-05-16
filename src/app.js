const express=require("express");
const {dbconncetion} = require("./config/databases");
const {User} = require("./models/userschema");
const { ReturnDocument } = require("mongodb");
const {validation} = require('./utils/validation');
const bcrypt = require("bcrypt");
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


app.post("/login",async (req,res)=>{
    try{
         const {Email,password}  = req.body;
    const user =await User.findOne({Email:Email});
    if(!user)
    {
       throw new Error("user is not found, plz register");
    }

    const isvalid = bcrypt.compareSync(password,user.password);
    if(!isvalid)
    {
        throw new Error("plz enter the correct password");
    }

    res.send("user login successfully ..");
    }catch(err)
    {
       res.send("Error :"+err.message);
    }

});
app.post("/signup",async (req,res)=>{
    // userobj={
    //     firstName:"Surya",
    //     secondName:"Machavarapu",   //this is the instance of the user
    //     email:"machavarapusurya2004",
    //     password:"23456",
    //     age:18
    // 
    
   try{
      validation(req);

      const {firstName,secondName,Email,password} = req.body;
     const hashpassword = bcrypt.hashSync(password, 10);
      console.log(hashpassword);
      
      const user =new User({
        firstName,
        secondName,
        Email,
        password:hashpassword
      });
      await user.save();
     res.send("succssfully added the user details");
   }catch(err)
   {
     res.status(404).send("Error: "+err.message);
     
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
