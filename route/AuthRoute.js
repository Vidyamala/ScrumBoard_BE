const { register,login } = require("../controller/Auth")

module.exports=(app)=>{
    app.post("/projectmanagement/api/v1/register",register);
    app.post("/projectmanagement/api/v1/login",login)
}