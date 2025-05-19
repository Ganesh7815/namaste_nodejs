const express = require("express");

const router = express.Router();
const {authuser} = require("../middlewares/auth");

router.post("/connection",authuser,(req,res)=>{
   
  const firstName = req.user.firstName;
  res.send(`${firstName} is sent connection`);
});


router.get("/feed", async (req, res) => {
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


module.exports = router;
