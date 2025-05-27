const express=require("express");
const {dbconncetion} = require("./config/databases");
const cookieParser = require("cookie-parser");
const { ReturnDocument } = require("mongodb");

const app=express();
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./Routes/authRouter");
const connection = require("./Routes/connection");
const profileRouter = require("./Routes/profileRouter");
const profileConnection = require("./Routes/profileConnectionsRouter");


app.use("/",authRouter);
app.use("/",connection);
app.use("/",profileRouter);
app.use("/",profileConnection);


dbconncetion().then(()=>{
    console.log("database connection is estalbished");
    app.listen(7777,()=>{
    console.log("server is successsfully running on the 7777"); 
    })
}).catch(err=>{
    console.log("error is occred");
})
