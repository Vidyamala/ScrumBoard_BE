const constants=require("../utils/constants");
const user=require("../models/UserModel");
const updateUser=async (req,res)=>{
   try{
    const id=req.params.id;
   const update= await user.findOneAndUpdate({userId:id},{status:constants.userStatus.approved},{new:true});
   return res.status(200).send({message:"User updated successfully", updatedUser:update})
   
   }
   catch(e){
   res.status(500).send({message:e.message})
   }
}
const addProject=async(req,res)=>{
    try{
        var {project}=req.body;
        var userId=req.params.id;
        var userDetail=await user.findOneAndUpdate({userId}, {
            $push: { project: project },
          },
          {
            new: true,
          });
          res.status(200).send({message:"Updated successfully",user:userDetail})

    }
    catch(e){
        res.status(500).send({message:e.message})
    }
}
const getUserById=async(req,res)=>{
    var {id}=req.params;
   
    try{
        
        var users=await user.findOne({userId:id})
       
    res.status(200).send(users);
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
}
const getAllUserId=async(req,res)=>{
  var query=req.query;
  console.log(query)
    try{
        
        var users=await user.find({...query},{userId:1,_id:0}).distinct("userId")
       
    res.status(200).send(users);
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
}

module.exports={
    updateUser,
    addProject,
    getUserById,
    getAllUserId
}