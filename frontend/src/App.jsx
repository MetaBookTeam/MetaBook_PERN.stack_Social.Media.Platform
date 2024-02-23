import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routers";
import { useState } from "react";
import axios from "axios";

function App() {
  //* Upload Images to Cloudinary //////////////////////////
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <RouterProvider router={router} state={{ url, setUrl, image, setImage }} />
  );
}

export default App;
