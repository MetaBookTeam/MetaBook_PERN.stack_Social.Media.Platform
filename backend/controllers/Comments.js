import pool from "../models/db"
//dont forget to import pool
//create comments
const CreateComments=(req,res)=>{
 //endpoint and method (post,/CreateComment)

 //we want to create comment in req.body
 const {comment}=req.body;
pool.query(``,)
}
module.exports={
    CreateComments,
}