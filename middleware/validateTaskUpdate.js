const Task=require("../models/TaskModel");
const verifyTaskUpdate=async (req,res,next)=>{
    const id=req.params.id
    console.log(req.user);
     const task= await Task.findOne({_id:id});
     if(task.assignee== req.user.userId || task.createdBy== req.user.userId || req.user.userType=="ADMIN"){
        next()
     }
     else{
        return res.status(400).send({message:"OOPS! You don't have enough permisssion to update this task"})
     }
  
}
module.exports={
    verifyTaskUpdate

}