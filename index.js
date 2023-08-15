const express=require("express");
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.json());
const cors= require('cors');
app.use(cors())
const mongoose=require("mongoose");
const { db_url } = require("./config/db.config");
const { port } = require("./config/server.config");
mongoose.connect(db_url,{useNewUrlParser:true})
.then(()=>console.log("Connected to mongoDB"))
.catch((err)=>console.log(err.message))
require("./route/AuthRoute")(app)
require("./route/UserRoute")(app)
require("./route/TaskRoute")(app)
app.listen(port,()=>{console.log(`Application running on port ${port}`)})