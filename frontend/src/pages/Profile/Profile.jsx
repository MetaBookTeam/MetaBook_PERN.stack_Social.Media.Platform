import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  
  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
