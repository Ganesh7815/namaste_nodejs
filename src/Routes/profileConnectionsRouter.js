const express = require("express");
const {authuser} = require("../middlewares/auth");
const {Connection} = require("../models/connection");
const {User} = require("../models/userschema");
const router = express.Router();

const allowed_fileds = ["firstName","secondName","photoUrl","skills","about","age","gender"];
router.get("/requests/received",authuser,async (req,res) =>{
  try{

    const loggedinuser = req.user;
    // const numberofconnections = await Connection.find({toIdFrom:loggedinuser._id},{status:"interested"});
    const numberofconnections = await Connection.find({$and:[{toIdFrom:loggedinuser._id},{status:"interested"}]}).populate("fromIdFrom",allowed_fileds).populate("toIdFrom",allowed_fileds);

    if(numberofconnections.length<=0)
    {
        res.status(202).json({data:"there are no requests recived at present"});
        return;
    }

    const userConnections = numberofconnections.map(connection =>{
        return connection.fromIdFrom;
    })
    res.status(202).json({data: userConnections});

  }catch(err)
  {
    res.status(404).status(404).json({error:`${err.message}`});
  }
});


router.get("/connections",authuser, async (req,res)=>{

    try{
            const loggedinuser = req.user;

        const totalConnections = await Connection.find({$or:[{fromIdFrom:loggedinuser},{toIdFrom:loggedinuser}],status:"accepted"})
        .populate("toIdFrom",allowed_fileds)
        .populate("fromIdFrom",allowed_fileds);

        if(totalConnections.length<=0)
        {
            res.status(202).json({data:"you have not made any Connections yet!!"});
            return;
        }

        const otherusers = totalConnections.map(connection =>{
            if(connection.fromIdFrom._id.toString()==loggedinuser._id.toString())
            {
                return connection.toIdFrom;
            }else{
                return connection.fromIdFrom;
            }
        });

        res.status(202).json({data:otherusers});

     }catch(err)
     {
        res.status(402).json({error:`${err.message}`});
     }
});


router.get("/feed", authuser, async (req, res) => {
  try {
    // 1. interested
    // 2. ignore
    // 3. connection
    // 4. not respond for requesting
    // 5. your carding

    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit);

    // limit = limit>2? 2: limit;
    // page = page>3? 3 : page;

    const skip = (page-1)*limit;
    
    const loggedinuser = req.user;
    const hidingUsers = await Connection.find({
      $or: [{ fromIdFrom: loggedinuser }, { toIdFrom: loggedinuser }]
    });

    const uniqueuserids = new Set();

    hidingUsers.forEach(connection => {
      uniqueuserids.add(connection.fromIdFrom._id.toString());
      uniqueuserids.add(connection.toIdFrom._id.toString());
    });

    // uniqueuserids.delete(loggedinuser._id.toString());

    const remainingUsers = await User.find({
      _id: { $nin: [...uniqueuserids, loggedinuser._id] }
    }).select(allowed_fileds).skip(skip).limit(limit);

    res.json({data:remainingUsers});
  } catch (err) {
    res.json({error:err.message});
  }
});


module.exports = router;