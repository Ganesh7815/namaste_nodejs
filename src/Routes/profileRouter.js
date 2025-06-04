
const express = require("express");
const {User} = require("../models/userschema");
const router = express.Router();
const {authuser} = require("../middlewares/auth");
const {validation} = require("../utils/validation");
const bcrypt = require("bcrypt");



router.get("/profile/view",authuser,async(req,res)=>{
    
    try{
       const userdata =  req.user;
        res.status(202).json({data:userdata});
      }catch(err)
      {
          res.status(402).json({error:err.message});
      }
        
});



router.patch("/profile/update",authuser, async (req, res) => {
  try {
    const userdata = req.body;
    const user=req.user;
     const allowed_fields = ["firstName","secondName", "age", "about", "skills", "photoUrl","gender"];
    const isAllowed = Object.keys(userdata).every((key) =>
      allowed_fields.includes(key)
    );

    if (!isAllowed) {
      return res.status(402).json({"error":"Invalid fields in request body"});
    }

    // validation(req);
   const userUpdated =  Object.keys(userdata).forEach((key)=>{user[key]=userdata[key]});
  await user.save();
    res.status(202).send({data:user});
  } catch (err) {
    res.status(402).json({"error":err.message});
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
