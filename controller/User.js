const constants=require("../utils/constants");
const user=require("../models/UserModel");
const updateUser=async (req,res)=>{
   try{
    const id=req.params.id;
   const update= await user.findOneAndUpdate({userId:id},{status:constants.userStatus.approved},{new:true});
   return res.status(200).send({message:"User updated successfully", updatedUser:update})
   
   }
   catch(e){
    console.log(e.message)
   }
}
module.exports={
    updateUser
}