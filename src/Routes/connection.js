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
              // console.log(touser);
              
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

             res.status(202).json({data:"succesfflu sent"});
     }catch(err)
     {
        res.status(402).json({error:err.message});
     }

});


router.post("/request/review/:status/:requestId",authuser,async (req,res)=>{
  try{
     
    const loggedinuser = req.user
    const {status,requestId} = req.params;
    console.log(requestId);
    
    const userindb = await Connection.findOne({
      fromIdFrom:requestId,
      toIdFrom:loggedinuser._id,
      status:"interested",
    
    });
    
    if(!userindb)
    {
      throw new Error("connection request not found");
    }

      // console.log(userindb);

    userindb.status=status;
    await userindb.save();
    res.status(202).json({data:"successfully"})

  }catch(err)
  {
    res.status(402).json({error: `${err.message}`});
  }
})



module.exports = router;
