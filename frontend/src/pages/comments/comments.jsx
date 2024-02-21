import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
              dispatch(setComments(response.data.result)); // Assuming the API response has a 'result' property containing comments
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const deleteComment = (commentId) => async (dispatch) => {
            try {
              await axios.delete(`http://localhost:5000/comments/${commentId}`);
              dispatch(removeComment(commentId));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const updateComment = (commentId, updatedComment) => async (dispatch) => {
            try {
              await axios.put(`http://localhost:5000/comments/${commentId}`, { comment: updatedComment });
              dispatch(updateSingleComment({ id: commentId, updatedComment }));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const getCommentById = (commentId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/comments/${commentId}`);
              dispatch(setSingleComment(response.data.result)); // Assuming the API response has a 'result' property containing the single comment
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
        
       
    }