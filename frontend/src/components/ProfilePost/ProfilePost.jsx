import React, { useState ,useEffect} from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Comments from "../../pages/comments/comments";
import { styled } from "@mui/material/styles";
import IconButton from '@mui/joy/IconButton';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';

import {useSelector, useDispatch } from "react-redux";
import {updatePostById} from '../../Service/redux/reducers/Posts/postsSlice'
import axios from "axios";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function ProfilePost({ elem }) {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);

  const [content, setContent] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const updatePostById = async (post_id) => {
  

    console.log(post_id);
    const info = content;
    try {
      const newInfo = await axios.put(
        `http://localhost:5000/posts/${post_id}`,
        { info },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(updatePostById(newInfo.data.result));
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
   
  
 }
//  useEffect(() => {
//   updatePostById();
// },[]);
  return (
    <Card
      variant="outlined"
      sx={{
        marginBlock: "10px",
        minWidth: 300,
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar size="sm" src={elem.image} />
        </Box>
        <Typography fontWeight="lg">{elem.user_name}</Typography>
        <br />
       
        <IconButton onClick={handleOpen} variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>

      {elem.photo_url && (
        <CardOverflow>
          <AspectRatio>
            <img src={elem.photo_url} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      )}

      <CardContent>
        <Typography fontSize="sm" marginBottom={2}>
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          ></Link>{" "}
          {elem.content}
        </Typography>
        {/* </Paper> */}
        <hr />
        <Comments post={elem} />
      </CardContent>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit post 
            
             
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField onChange={(e) => {
              setContent(e.target.value)
            }} id="standard-basic" label="Content" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            </Typography>
            <br/>
            <Button onClick={() => {updatePostById(elem.id)}} variant="text">Edit</Button>
          </Box>
        </Fade>
      </Modal>
    </Card>
  );
}

export default ProfilePost;
