const constants=require("../utils/constants");
const user=require("../models/UserModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const register=async (req,res)=>{
  var {userId,password,email,userType}=req.body;
  if(!userType){
    userType:constants.userType.engineer
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
    let {userId,password}=req.body;
    userId=userId.toLowerCase();
    if(!userId || !password){
        return res.status(400).send({message:"userId/ password cann't be empty"})
    }
    const users=await user.findOne({userId:userId});
    if(!users){
      return res.status(400).send({message:`${userId} doesn't exists`})
   }
    if(users.status!=constants.userStatus.approved){
      return res.status(403).send({message:`${userId} is in ${users.status}, please contact Admin`})
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