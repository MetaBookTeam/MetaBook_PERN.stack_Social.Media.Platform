//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import{ setLoading,
    setError,setcomments,
    getCommentsByPostId,
    deletecomments,
    updateComment,
    getCommentById,setSingleComment,setLikes,
    setShares,
    addShare,
    deleteShare,
    removeLike,
    addLike} from "../../Service/redux/reducers/comments/commentsSlice"
    export default function Posts() {
      
      
        //* Redux
        const dispatch = useDispatch();
      
      
      
        const comments = useSelector((state) => state.comments.comments);
         const getCommentsByPostId = (postId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/comments/${postId}/comments`);
              dispatch(setcomments(response.data.result)); 
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const deleteComment = (commentId) => async (dispatch) => {
            try {
              await axios.delete(`http://localhost:5000/comments/${commentId}`);
              dispatch(deletecomments(commentId));
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
              dispatch(setcomments(response.data.result)); 
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          const deleteCommentLikeById = (likeId) => async (dispatch) => {
            try {
              await axios.delete(`http://localhost:5000/likes/${likeId}`);
              dispatch(removeLike(likeId));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          const createCommentLike = (likeData) => async (dispatch) => {
            try {
              const response = await axios.post(`http://localhost:5000/likes`, likeData);
              dispatch(addLike(response.data.result));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          const getLikesByCommentId = (commentId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/comments/${commentId}/likes`);
              dispatch(setLikes(response.data.result));
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          const getShareByPostId = (postId) => async (dispatch) => {
            dispatch(setLoading());
            try {
              const response = await axios.get(`http://localhost:5000/posts/${postId}/shares`);
              dispatch(setShares(response.data.result));
              dispatch(getShareByPostId())
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          const createShareByPostId = (postId, shareData) => async (dispatch) => {
            try {
              const response = await axios.post(`http://localhost:5000/posts/${postId}/shares`, shareData);
              dispatch(addShare(response.data.result));
              dispatch(createShareByPostId());
            } catch (error) {
              dispatch(setError(error.message));
            }
          };
          
           const softDeleteShare = (shareId) => async (dispatch) => {
            try {
              await axios.put(`http://localhost:5000/shares/${shareId}`, { isDeleted: true });
              dispatch(deleteShare(shareId))
              dispatch(softDeleteShare())
            } catch (error) {
              dispatch(setError(error.message));
            }
        }
    }
    //export default commentsSlice.reducer;