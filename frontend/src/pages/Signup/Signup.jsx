import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import GeoLocation from "../../components/GeoLocation/GeoLocation";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();

import { useDispatch, useSelector } from "react-redux";
import { setSignup } from "../../Service/redux/reducers/auth/authSlice";
import PhoneNumber from "../../components/PhoneNumber/PhoneNumber";
// import CloudinaryImage from "../../components/CloudinaryImage/CloudinaryImage";

const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export default function Signup() {
  const navigate = useNavigate();
  //===============================================================
  //* show/hide Password

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //===============================================================
  //* show/hide Repeat Password

  const [showRePassword, setShowRePassword] = useState(false);

  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };
  //===============================================================

  //* Redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // auth.isLoggedIn, auth.token, auth.userId;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  //* Cloudinary
  const [image, setImg] = useState("");
  const [url, setUrl] = useState("");

  //* Upload Images to Cloudinary //////////////////////////
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        console.log("image URL ==> ", data.data.secure_url);
        setUrl(data.data.secure_url);
        // dispatch(setUrl(JSON.stringify(data.url)));
      })
      .catch((err) => console.log(err));
  };

  //===============================================================

  const signup = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // //! check password match re_password
    // console.log(
    //   "check password match re_password",
    //   data.get("password") === data.get("re_password")
    // );

    console.log({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      user_name: data.get("user_name").toLowerCase(),
      email: data.get("email").toLowerCase(),
      password: data.get("password"),
      image: url,
      school: data.get("school"),
      gender: data.get("gender"),
      birthday: data.get("birthday"),
      // phone_number: data.get("phone_number"),
      // city: data.get("city"),
      // state: data.get("state"),
      // country: data.get("country"),
      // cover_photo: data.get("cover_photo"),
      // bio: data.get("bio"),
    });

    if (data.get("password") !== data.get("re_password"))
      throw new Error("password not matched");

    //! SIGNUP AXIOS
    // try {
    //   const result = await axios.post("http://localhost:5000/users/register", {
    //     first_name: data.get("first_name"),
    //     last_name: data.get("last_name"),
    //     user_name: data.get("user_name").toLowerCase(),
    //     email: data.get("email").toLowerCase(),
    //     password: data.get("password"),
    //     // image: data.get("image"),
    //     // school: data.get("school"),
    //     gender: data.get("gender"),
    //     birthday: data.get("birthday"),
    //     // phone_number: data.get("phone_number"),
    //     // city: data.get("city"),
    //     // state: data.get("state"),
    //     // country: data.get("country"),
    //   });
    //   if (result.data) {
    //     console.log("result.data.result", result.data.result);
    //     setStatus(true);
    //     setMessage(result.data.message);
    //     dispatch(setSignup(result.data.result));
    //   } else throw Error;
    // } catch (error) {
    //   if (error.response && error.response.data) {
    //     setStatus(true);
    //     return setMessage(error.response.data.message);
    //   }
    //   setMessage("Error happened while Signup, please try again");
    // }
  };

  //===============================================================

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.isLoggedIn]);

  //===============================================================

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Signup
              </Typography>
              <Box component="form" noValidate onSubmit={signup} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="first_name"
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                      autoComplete="first_name"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="last_name"
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      autoComplete=""
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      name="user_name"
                      fullWidth
                      id="user_name"
                      label="User Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete=""
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel htmlFor="re_password">
                        Repeat Password
                      </InputLabel>
                      <OutlinedInput
                        id="re_password"
                        type={showRePassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle repeat password visibility"
                              onClick={handleClickShowRePassword}
                              onMouseDown={handleMouseDownRePassword}
                              edge="end"
                            >
                              {showRePassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="re_password"
                        name="re_password"
                        // error
                        // helperText="Incorrect entry."
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="gender"
                      select
                      label="Gender"
                      defaultValue="male"
                      helperText="Select your gender"
                      name="gender"
                      type="gender"
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="birthday"
                      name="birthday"
                      type="date"
                      helperText="Select your birthday"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PhoneNumber id="phone_number" />
                  </Grid>

                  <Grid item xs={12} marginBottom={2}>
                    <TextField
                      fullWidth
                      id="school"
                      label="School Name"
                      name="school"
                    />
                  </Grid>

                  <GeoLocation id="geo_location" />

                  {/* <Grid item xs={12}>
                    <TextField
                      sx={{ width: "75%" }}
                      id="image"
                      label="Choose your image ..."
                      name="image"
                    />
                    <Button
                      variant="outlined"
                      sx={{ width: "22%", height: "100%", marginLeft: "3%" }}
                    >
                      upload
                    </Button>
                  </Grid> */}

                  {/* <CloudinaryImage /> */}
                  <Grid item xs={12}>
                    <TextField
                      sx={{ width: "75%" }}
                      id="image"
                      name="image"
                      type="file"
                      onChange={(e) => {
                        // console.log(e.target.files[0]);
                        setImg(e.target.files[0]);
                        // dispatch(setImage(e.target.files[0].name,e.target.files[0].type,e.target.files[0].lastModified,e.target.files[0].size));
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
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ mt: 1, color: "red" }}>
                    all fields with * are required
                  </Typography>
                  <FormControlLabel
                    sx={{ mt: 2 }}
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
                {status
                  ? message && <div className="SuccessMessage">{message}</div>
                  : message && <div className="ErrorMessage">{message}</div>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
