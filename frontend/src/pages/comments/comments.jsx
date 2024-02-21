//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import{setcomments,
    getCommentsByPostId,
    deletecomments,
    updateComment,
    getCommentById,setSingleComment} from "../../Service/redux/reducers/comments/commentsSlice"
    export default function Posts() {
      
      
        //* Redux
        const dispatch = useDispatch();
      
      
      
        const comments = useSelector((state) => state.comments.comments);
         const getCommentsByPostId = (postId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/comments/${postId}/comments`);
              dispatch(getCommentsByPostId(response.data.result)); 
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const deleteComment = (commentId) => async (dispatch) => {
            try {
              await axios.delete(`http://localhost:5000/comments/${commentId}`);
              dispatch(deleteComment(commentId));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const updateComment = (commentId, updatedComment) => async (dispatch) => {
            try {
              await axios.put(`http://localhost:5000/comments/${commentId}`, { comment: updatedComment });
              dispatch(updateComment({ id: commentId, updatedComment }));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const getCommentById = (commentId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/comments/${commentId}`);
              dispatch(getCommentById(response.data.result)); 
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
        
       
    }