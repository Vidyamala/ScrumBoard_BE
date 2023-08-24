const Task=require("../models/TaskModel");
const UserModel = require("../models/UserModel");
exports.createTask=async(req,res)=>{
    var {taskname,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee,status,priority}=req.body;
    createdBy=req.user.userId;
    assignee=assignee.toLowerCase();
    
    var  task={taskName:taskname,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee,status,priority};
    var newTask=await Task.create(task);
    res.send(newTask);
}
exports.getTask=async(req,res)=>{
    var {project,phase,sprint,category}=req.query;
    console.log(project,phase,sprint,category)
    try{
        var task=await Task.find({project,phase,sprint,category})
    res.status(200).send(task);
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
}
exports.getDistinctProject=async(req,res)=>{
    var user=req.user;

    var projects=await UserModel.findOne({_id:user._id},{project:1,_id:0});
    res.send(projects)
}
exports.getPhase=async(req,res)=>{
    var {project}=req.query;
    console.log(project)
    var projects=await Task.find({project:project},{phase:1,_id:0}).distinct("phase");
    res.send(projects)
}
exports.getSprint=async(req,res)=>{
    var {project,phase}=req.query;
    var sprint=await Task.find({project,phase},{sprint:1,_id:0}).distinct("sprint");
    res.send(sprint)
}
exports.getCategory=async(req,res)=>{
    var projects=await Task.distinct("category");
    res.send(projects)
}
exports.createProject=async(req,res)=>{
    var {project}=req.body;
  try{
    var Project=await Task.create({project});
    console.log(Project);
    res.status(201).send({message:`${project} created Successfully`})
  }
  catch(e){
    res.status(500).send({message:e.message})
  }
}
exports.createCategory=async(req,res)=>{
    var {category}=req.body;
   var Category=await Task.create({category});
   console.log(Category);
   res.status(201).send({message:`${category} created Successfully`})
}
exports.createPhase=async(req,res)=>{
    var {project,phase}=req.body;
   var Phase=await Task.create({project,phase});
   console.log(Phase);
   res.status(201).send({message:`${category} created Successfully`})
}
exports.createSprint=async(req,res)=>{
    var {project,phase,sprint}=req.body;
   var Sprint=await Task.create({project,phase,sprint});
   console.log(Sprint);
   res.status(201).send({message:`${sprint} created Successfully`})
}
exports.updateTask=async(req,res)=>{
    const id=req.params.id;
    var {project,phase,sprint,taskName,status,estimatedEffort,acceptanceCriteria,assignee,category,priority}=req.body;
    var newDetails={
        project,phase,sprint,taskName,status,estimatedEffort,acceptanceCriteria,assignee,category,priority
    }
    var crtdetails={};
    for(const i in newDetails){
        if(newDetails[i]){
            crtdetails[i]=newDetails[i];
        }
    }
   try{
    const UpdatedTask= await Task.findOneAndUpdate({_id:id},{
        ...crtdetails
    },{
        new:true
    });
    return res.status(200).send({message:"Task updated successfully",Task:UpdatedTask})
   }
   catch(e){
    res.status(500).send({message:"Internal server error",error:e.message})
   }
   
}
exports.getAllProject=async(req,res)=>{
   
    var projects=await Task.find({},{project:1,_id:0}).distinct("project");
    res.send(projects)
}