const Task=require("../models/TaskModel");
const UserModel = require("../models/UserModel");
exports.createTask=async(req,res)=>{
    var {taskName,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee,status,priority}=req.body;
    createdBy=req.user;
    assignee=assignee.toLowerCase();
    
    var  task={taskName,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee,status,priority};
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