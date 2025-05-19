
const express = require("express");
const {User} = require("../models/userschema");
const router = express.Router();
const {authuser} = require("../middlewares/auth");
router.get("/profile",authuser,async(req,res)=>{
    
    try{
       const userdata =  req.user;
        res.status(202).send(userdata + "this is profile of user");
      }catch(err)
      {
          res.status(404).send("Error :"+err.message);
      }
        
});



router.patch("/user", async (req, res) => {
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


router.get("/user",async (req,res)=>{
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
});

module.exports = router;
