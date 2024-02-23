import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { useEffect ,useState} from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState([]);
  
  const getUserById = async () => {
   try {
    const user = await  axios.get(`http://localhost:5000/users/${auth.userId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    setUserProfile(...user.data.result);
    console.log(user.data.result);
   } catch (error) {
    console.log(error);
   }
  }
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <>
     {userProfile.id}
     {userProfile.image}
     {userProfile.user_name}
     {userProfile.email}
     {userProfile.cover_photo}
     {userProfile.bio}


      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 70, height: 70 }}
      />
    </>
  );
};

export default Profile;
