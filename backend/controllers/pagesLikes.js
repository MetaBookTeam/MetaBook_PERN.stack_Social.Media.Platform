const pool = require("../models/db")

// 1- this function Like page

const createNewPageLike=(req,res)=>{
    const {user_id}=req.token
    const {page_id}=req.body

    const query=`INSERT INTO page_likes (user_id,page_id) VALUES ($1,$2)RETURNING *`
    const data =[user_id,page_id]

    pool
    .query(query,data)
    .then((result)=>{
        res.status(201).json({
            success:true,
            message:"Liked successfully",
            result:result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server Error",
            err:err
        })
    })
}

// 2- this function unLike page
const deletePageLikeById=(req,res)=>{
    const {user_id}=req.token
    const {page_id}=req.params
    const query=`DELETE FROM page_likes WHERE user_id=$1 AND page_id=$2 RETURNING *`
    const data=[user_id,page_id]
    pool
    .query(query,data)
    .then((result)=>{
        res.status(200).json({
            success:true,
            message:"unLike successfully",
            result:result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server Error",
            err:err
        })
    })
}

module.exports={createNewPageLike,deletePageLikeById}

