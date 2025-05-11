const authuser=(req,res,next)=>{
    const authcode='xyz';
    if(authcode!='xyz')
    {
       return res.status(404).send("user is not a authoriized");
    }
    next();
}

module.exports={authuser};