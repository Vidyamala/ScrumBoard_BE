const { updateUser, addProject } = require("../controller/User")
const { verifyToken } = require("../middleware/Auth.middleware")
const { verifyUpdate } = require("../middleware/verifyUpdate")

module.exports=(app)=>{
    app.put("/projectmanagement/api/v1/user/:id",[verifyToken,verifyUpdate],updateUser);
    app.put("/projectmanagement/api/v1/project/:id",[verifyToken,verifyUpdate],addProject);
}
