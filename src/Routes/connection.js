const express = require("express");

const router = express.Router();
const {authuser} = require("../middlewares/auth");
const {Connection} = require("../models/connection");
const { default: mongoose } = require("mongoose");
const {User} = require("../models/userschema");

router.post("/request/send/:status/:userId",authuser,async (req,res)=>{
    
     try{
              const fromIdFrom = req.user.id;
              const toIdFrom = req.params.userId;
              const status = req.params.status;


              const isvalidConnection = await Connection.find({$or:[{fromIdFrom:fromIdFrom,toIdFrom:toIdFrom},{fromIdFrom:toIdFrom,toIdFrom:fromIdFrom}]});
                    
              if(isvalidConnection.length>0)
              {
                throw new Error("Conncetion is already sented,plz check once in  the list");
              }
              const touser =await User.findById({_id:toIdFrom});
              console.log(touser);
              
              if(!touser){
                throw new Error("plz sent to valid user");
              }
              if(fromIdFrom===toIdFrom)
              {
                throw new Error("same person cannnot sent conncetion");
              }
              if(status!=="ignored" && status!=="interested"){
                throw new Error("plz enter the correct status code");
              }
              const connection = new Connection({
                fromIdFrom,
                toIdFrom,
                status
              });

             await connection.save();

             res.send("connection request sent successfully!!!");
     }catch(err)
     {
        res.status(404).send("Error: "+err.message);
     }

});


router.get("/feed", async (req, res) => {
  try {  
    const finduser = await User.findById({_id:"682282168051c6b395dc13d6"}); // Ensure 'email' matches DB field
    
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
