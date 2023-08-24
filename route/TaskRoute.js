const {createTask,getDistinctProject,getPhase,getSprint, getCategory, getTask, createProject, createPhase, createSprint, createCategory, updateTask, getAllProject}=require("../controller/Task");
const { verifyToken } = require("../middleware/Auth.middleware");
const { isAdmin } = require("../middleware/IsAdmin.middleware");
const {verifyTaskUpdate}=require("../middleware/validateTaskUpdate")
module.exports=(app)=>{
    app.post("/task",verifyToken,createTask);
    app.get("/task",verifyToken,getTask);
    app.get("/project",verifyToken,getDistinctProject);
    app.get("/phase",verifyToken,getPhase)
    app.get("/sprint",verifyToken,getSprint)
    app.get("/category",verifyToken,getCategory);
    app.post("/project",[verifyToken,isAdmin],createProject);
    app.post("/category",[verifyToken,isAdmin],createCategory);
    app.post("/phase",[verifyToken,isAdmin],createPhase);
    app.post("/sprint",[verifyToken,isAdmin],createSprint);
    app.put("/task/:id",[verifyToken,verifyTaskUpdate],updateTask);
    app.get("/project/all",[verifyToken,isAdmin],getAllProject)
}