// import axios from "axios";
// import { useState } from "react";

// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   setImage,
// //   setUrl,
// // } from "../../Service/redux/reducers/cloudinary/cloudinarySlice";

// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";

// // ==============================================
// // import { getDefaultMiddleware } from "@reduxjs/toolkit";

// // const customizedMiddleware = getDefaultMiddleware({
// //   serializableCheck: false,
// // });
// // ==============================================

// // ==============================================

// const CloudinaryImage = () => {
//   //* Redux
//   // const dispatch = useDispatch();
//   // const {image} = useSelector((state) =>
//   // return { auth: state.auth.auth })

//   // const { image } = useSelector((state) => {
//   //   return { image: state.cloudinary.image };
//   // });

//   // cloudinary.image, cloudinary.url;
//   const [image, setImg] = useState("");
//   const [url, setUrl] = useState("");

//   //* Upload Images to Cloudinary //////////////////////////
//   const uploadImage = () => {
//     // console.log(" cloudinary.image", "image");
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "cloudUploadP5");
//     data.append("cloud_name", "dpbh42kjy");
//     axios
//       .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
//       .then((data) => {
//         setUrl(data.data.secure_url);
//         // dispatch(setUrl(JSON.stringify(data.url)));
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <Grid item xs={12}>
//         <TextField
//           sx={{ width: "75%" }}
//           id="image"
//           name="image"
//           type="file"
//           onChange={(e) => {
//             // console.log(e.target.files[0]);
//             setImg(e.target.files[0]);
//             // dispatch(setImage(e.target.files[0].name,e.target.files[0].type,e.target.files[0].lastModified,e.target.files[0].size));
//             // dispatch(setImage(JSON.stringify(e.target.files[0])));
//           }}
//         />
//         <Button
//           variant="outlined"
//           sx={{ width: "22%", height: "100%", marginLeft: "3%" }}
//           onClick={uploadImage}
//         >
//           upload
//         </Button>
//       </Grid>
//     </>
//   );
// };

// export default CloudinaryImage;
