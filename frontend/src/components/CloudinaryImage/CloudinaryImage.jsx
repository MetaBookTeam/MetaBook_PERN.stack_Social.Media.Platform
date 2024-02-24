import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setUrl,
} from "../../Service/redux/reducers/cloudinary/cloudinarySlice";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// ==============================================
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
// ==============================================

// ==============================================

const CloudinaryImage = () => {
  //* Redux
  const dispatch = useDispatch();
  const cloudinary = useSelector((state) => state.cloudinary);
  // cloudinary.image, cloudinary.url;

  //* Upload Images to Cloudinary //////////////////////////
  const uploadImage = () => {
    console.log(" cloudinary.image", cloudinary.image);
    const data = new FormData();
    data.append("file", cloudinary.image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        console.log("data", data);
        dispatch(setUrl(data.url));
        // dispatch(setUrl(JSON.stringify(data.url)));
        // dispatch(setUrl(data.secure_url));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/*<div>
         <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={cloudinary.url} />
      </div> 
      </div>*/}
      <Grid item xs={12}>
        <TextField
          sx={{ width: "75%" }}
          id="image"
          name="image"
          type="file"
          onChange={(e) => {
            // console.log("e.target.value", e.target.value);
            // console.log("e.target.files", e.target.files);
            // console.log(e.target.files[0]);
            dispatch(setImage(e.target.files[0]));
            // dispatch(setImage(JSON.stringify(e.target.files[0])));
          }}
        />
        <Button
          variant="outlined"
          sx={{ width: "22%", height: "100%", marginLeft: "3%" }}
          onClick={uploadImage}
        >
          upload
        </Button>
      </Grid>
    </>
  );
};

export default CloudinaryImage;
