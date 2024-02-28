// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

// import AspectRatio from "@mui/joy/AspectRatio";
// import Avatar from "@mui/joy/Avatar";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import CardOverflow from "@mui/joy/CardOverflow";
// import Link from "@mui/joy/Link";
// import Typography from "@mui/joy/Typography";
// import MoreHoriz from "@mui/icons-material/MoreHoriz";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
// import SendOutlined from "@mui/icons-material/SendOutlined";
// import Face from "@mui/icons-material/Face";
// import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";

// import { styled } from "@mui/material/styles";
// import Post from "./Post";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "white",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const PostModal = () => {
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   const { userProfile } = useSelector((state) => state.users);
//   // users.users , users.userProfile;

//   // Post Modal Toggle ======================
//   const [openPost, setOpenPost] = useState(false);

//   const openPostModal = () => {
//     setOpenPost(true);
//     console.log("openPostModal handler");
//   };
//   const closePostModal = () => setOpenPost(false);

//   return (
//     <Modal
//       keepMounted
//       open={openPost}
//       onClose={closePostModal}
//       aria-labelledby="keep-mounted-modal-title"
//       aria-describedby="keep-mounted-modal-description"
//     >
//       <Box sx={modalStyle}>
//         <Typography
//           id="keep-mounted-modal-title"
//           variant="h6"
//           component="h2"
//           textAlign={"center"}
//         >
//           Post details
//           <hr />
//         </Typography>
//         <Post />
//       </Box>
//     </Modal>
//   );
// };

// export default PostModal;
