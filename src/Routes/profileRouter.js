
const express = require("express");
const {User} = require("../models/userschema");
const router = express.Router();
const {authuser} = require("../middlewares/auth");
const {validation} = require("../utils/validation");
const bcrypt = require("bcrypt");



router.get("/profile/view",authuser,async(req,res)=>{
    
    try{
       const userdata =  req.user;
        res.status(202).send(userdata + "is profile of user");
      }catch(err)
      {
          res.status(404).send("Error :"+err.message);
      }
        
});



router.patch("/profile/update",authuser, async (req, res) => {
  try {
    const userdata = req.body;
    const user=req.user;
     const allowed_fields = ["secondName", "age", "about", "skills", "photoUrl"];
    const isAllowed = Object.keys(userdata).every((key) =>
      allowed_fields.includes(key)
    );

    if (!isAllowed) {
      return res.status(400).send("Invalid fields in request body.");
    }

    // validation(req);
    console.log(user);
   const userUpdated =  Object.keys(userdata).forEach((key)=>{user[key]=userdata[key]});
  await user.save();
   console.log(user);
    res.send("Successfully updated.");
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again. " + err.message);
  }
});


router.patch("/profile/password",async(req,res)=>{
    try{
        const {email,age,newpassword} = req.body;
        
        const userdata = await User.findOne({ email: email });
        if(!userdata)
          {
            throw new Error("user not found");
          }
        
        if(userdata.age!==age)
          {
            throw new  Error("age should be same");
          }

          const hashpassword = bcrypt.hashSync(newpassword,10);
          userdata.password = hashpassword;
         await userdata.save();
          res.send("psaaword changed successfully");
        
    }catch(err)
    {
        res.send("Error: "+err.message);
    }
})


router.delete("/user",async (req,res)=>{
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

module.exports = router;
