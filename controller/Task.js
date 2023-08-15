const Task=require("../models/TaskModel");
const UserModel = require("../models/UserModel");
exports.createTask=async(req,res)=>{
    var {taskName,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee}=req.body;
    createdBy=req.user;
    assignee=assignee.toLowerCase();
    
    var  task={taskName,phase,project,sprint,category,acceptanceCriteria,estimatedEffort,createdBy,assignee};
    var newTask=await Task.create(task);
    res.send(newTask);
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
    var {project,phase}=req.body;
    var sprint=await Task.find({project,phase},{sprint:1,_id:0}).distinct("sprint");
    res.send(sprint)
}
exports.getCategory=async(req,res)=>{
    var projects=await Task.distinct("category");
    res.send(projects)
}