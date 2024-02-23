import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setUrl,
} from "../../Service/redux/reducers/cloudinary/cloudinarySlice";

const CloudinaryImage = () => {
  //* Redux
  const dispatch = useDispatch();
  const cloudinary = useSelector((state) => state.cloudinary);
  // cloudinary.image, cloudinary.url;

  //* Upload Images to Cloudinary //////////////////////////
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", cloudinary.image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        dispatch(setUrl(data.url));
        // dispatch(setUrl(data.secure_url));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => dispatch(setImage(e.target.files[0]))}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      {/* <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={cloudinary.url} />
      </div> */}
    </div>
  );
};

export default CloudinaryImage;
