const jwt=require("jsonwebtoken");
const User=require("../models/UserModel")
const verifyToken=async (req,res,next)=>{
    const token=req.headers["x-access-token"];
    console.log(token)
   try{
    const id=jwt.verify(token,process.env.SECRET)
    const user=await User.findOne({userId:id.id})
    req.user=user;
   }
   catch(e){
   return res.status(403).send({message:e.message})
   }
    next()
}
module.exports={
    verifyToken
}