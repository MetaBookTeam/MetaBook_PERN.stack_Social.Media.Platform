const pool = require("../models/db");

// 1- this function create New Page

const createNewPage= (req,res)=>{
     /* 
POST http://localhost:5000/pages/

{
    "user_id": "1"
    "page_name" :"meta"
}
*/
const{user_id}=req.token.userId
const {page_name}=req.body

const query = `INSERT INTO pages (user_id,page_name) VALUES ($1,$2) RETURNING *`;
  const data = [user_id,page_name];

  pool
  .query(query,data)
  .then((result)=>{
    res.status(201).json({
        success:true,
        message:"Page created",
        result:result.rows
    })
  }).catch((err)=>{
    res.status(500).json({
        success:false,
        message:"Server Error",
        err:err.message
    })
  })


}

// 2- this function getAllPages

//GET http://localhost:5000/pages/

const getAllPages=(req,res)=>{
    const query ='SELECT * FROM pages'
    
    pool
    .query(query)
    .then((result)=>{
        res.status(200).json({
            success:true,
            message:"All the Pages",
            pages:result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server Error",
            err:err.message
        })
    })
}

// 3- this function getPagesByUserId

//GET http://localhost:5000/pages/search_1/:id

const getPagesByUserId=(req,res)=>{
    const id =req.params.id

    const query=``
}

module.exports={
    createNewPage,
    getAllPages
}