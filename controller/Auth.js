const constants=require("../utils/constants");
const user=require("../models/UserModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const register=async (req,res)=>{
  var {userId,password,email,userType}=req.body;
  if(!userType){
    userType:constants.userType.pending
  }
  var hashedpassword=bcrypt.hashSync(password,10);
  var users={
    userId,
    password:hashedpassword,
    email,
    userType
  }
 try{
    let userCreated=await user.create(users);
    res.status(201).send(userCreated);

 }
 catch(err){
   if(err.code==11000){
    return res.status(400).send({message:"UserId/Email already exists"})
   }
   
    res.status(500).send({message:err.message});
 
 }

}
const login=async (req,res)=>{
    const{userId,password}=req.body;
    if(!userId || !password){
        return res.status(400).send({message:"userId/ password cann't be empty"})
    }
    const users=await user.findOne({userId:userId});
    if(!users){
       return res.status(400).send({message:`${userId} doesn't exists`})
    }
    const isauth=bcrypt.compareSync(password,users.password);

    if(!isauth){
     return res.status(400).send({message:"Invalid password"})
    }
    const token=jwt.sign({id:userId},process.env.SECRET)
   
    res.status(200).send({
        userId,
        email:user.email,
       status: users.status,
       userType: users.userType,
        token
    })
}
module.exports={
    register,
    login
}