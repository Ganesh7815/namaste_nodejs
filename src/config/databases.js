const mongoose = require("mongoose");
require('dotenv').config();
// const dbconnection = mongoose.connect("mongodb+srv://machavarapuganesh:Ganesh123%40@namastenode.n20u3pz.mongodb.net/Namastedb");
// if(dbconnection)
// {
//     console.log("database conncetion is establised");
   
// }else{
//     console.log("database connection is flaid");
    
// }


//this is these two are  not best case
// const connectdb= async () =>{
//     await mongoose.connect(
//     "mongodb+srv://machavarapuganesh:Ganesh123%40@namastenode.n20u3pz.mongodb.net/Namastedb");
// };


// connectdb().then(()=>{
//     console.log("database connection is esblashed successsful"); 
// }).catch(err => {
//     console.log("database conncetion is failed");
    
// })


const dbconncetion = async () =>{
   await  mongoose.connect(process.env.MONGO_URL);
};

module.exports={dbconncetion};