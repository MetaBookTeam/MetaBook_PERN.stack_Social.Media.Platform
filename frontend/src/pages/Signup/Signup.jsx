import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// import GeoLocation from "../../components/GeoLocation/GeoLocation";
import GeoLocationHandler from "../../components/GeoLocation/GeoLocationHandler";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import Container from "@mui/material/Container";
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
import Modal from "@mui/material/Modal";
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

// import PhoneNumber from "../../components/PhoneNumber/PhoneNumber";
import { MuiTelInput } from "mui-tel-input";

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

//* modal style /////////////////////////
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

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
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  //* Upload Images to Cloudinary //////////////////////////
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        // setUrl(data.data.secure_url);
        console.log(data.data.url);
        setImageUrl(data.data.url);

        setUploadMessage("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
        setUploadMessage("Image Upload Error");
      });
  };

  //===============================================================
  //* Phone Number state

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumber = (newValue) => {
    setPhoneNumber(newValue);
  };

  //===============================================================
  //* GeoLocation states
  const [countryGeoId, setCountryGeoId] = useState("");
  const [countryName, setCountryName] = useState("");
  const [stateGeoId, setStateGeoId] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityGeoId, setCityGeoId] = useState("");
  const [cityName, setCityName] = useState("");

  //===============================================================
  //* Modal registration rules
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //===============================================================

  //* signupHandler
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const signupHandler = async (event) => {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordMatchMessage("");
    setEmailMessage("");
    setUserNameMessage("");

    const data = new FormData(event.currentTarget);

    //* passwordValidation
    /* 
Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
*/
    const passwordValidation = (str) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_=+-])[A-Za-z\d@$!%*?&_=+-]{8,}$/.test(
        str
      );

    const validPassword = passwordValidation(data.get("password"));
    if (!validPassword) {
      setPasswordMessage("password is not valid!");
    }

    const passwordMatched = data.get("password") === data.get("re_password");
    if (!passwordMatched) {
      setPasswordMatchMessage("password not matched");
    }

    //* emailValidation
    const emailValidation = (str) =>
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(str);

    const validEmail = emailValidation(data.get("email").toLowerCase());
    if (!validEmail) {
      setEmailMessage("email is not valid!");
    }

    //* usernameValidation
    /* 
    a valid username according to the following rules:
1. The username is between 4 and 25 characters.
2. It must start with a letter.
3. It can only contain letters, numbers, and the underscore character.
4. It cannot end with an underscore character.
    */
    const usernameValidation = (str) =>
      /^(?=[\w]{4,25}$)[^0-9_].*[^_]$/.test(str);

    const validUserName = usernameValidation(
      data.get("user_name").toLowerCase()
    );
    if (!validUserName) {
      setUserNameMessage("User Name is not valid!");
    }

    console.log({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      user_name: data.get("user_name").toLowerCase(),
      email: data.get("email").toLowerCase(),
      password: data.get("password"),
      image: imageUrl,
      school: data.get("school"),
      gender: data.get("gender"),
      birthday: data.get("birthday"),
      phone_number: phoneNumber,
      city: cityName,
      state: stateName,
      country: countryName,
    });
    if (!passwordMatched || !passwordMatched || !validEmail || !validUserName)
      throw new Error();

    try {
      const result = await axios.post("https://meraki-academy-project-5.onrender.com/users/register", {
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        user_name: data.get("user_name").toLowerCase(),
        email: data.get("email").toLowerCase(),
        password: data.get("password"),
        image: imageUrl,
        school: data.get("school"),
        gender: data.get("gender"),
        birthday: data.get("birthday"),
        phone_number: phoneNumber,
        city: cityName,
        state: stateName,
        country: countryName,
      });
      if (result.data) {
        setPasswordMessage("");
        passwordMatchMessage("");
        setEmailMessage("");
        setUserNameMessage("");

        console.log("result.data.result", result.data.result);
        setStatus(true);
        setMessage(result.data.message);
        dispatch(setSignup(result.data.result));
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setStatus(false);
        return setMessage(error.response.data.message);
      }
      setStatus(false);
      setMessage("Error happened while Signup, please try again");
    }
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
              <Box
                component="form"
                noValidate
                onSubmit={signupHandler}
                sx={{ mt: 1 }}
              >
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
                    <FormControl fullWidth>
                      <TextField
                        required
                        name="user_name"
                        id="user_name"
                        label="User Name"
                      />
                      <FormHelperText sx={{ color: "red" }}>
                        {userNameMessage && userNameMessage}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete=""
                      />
                      <FormHelperText sx={{ color: "red" }}>
                        {emailMessage && emailMessage}
                      </FormHelperText>
                    </FormControl>
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
                      <FormHelperText sx={{ color: "red" }}>
                        {passwordMessage && passwordMessage}
                      </FormHelperText>
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
                      <FormHelperText sx={{ color: "red" }}>
                        {passwordMatchMessage && passwordMatchMessage}
                      </FormHelperText>
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
                    {/* <PhoneNumber id="phone_number" /> */}
                    <MuiTelInput
                      value={phoneNumber}
                      onChange={handlePhoneNumber}
                    />
                  </Grid>

                  <Grid item xs={12} marginBottom={2}>
                    <TextField
                      fullWidth
                      id="school"
                      label="School Name"
                      name="school"
                    />
                  </Grid>

                  {/* //* /////////////////////////////////// */}

                  {/* <GeoLocation id="geo_location" /> */}
                  <Grid item xs={12}>
                    <Container component="main" maxWidth="lg">
                      <Box>
                        <FormControl>
                          <Grid container spacing={4}>
                            <Grid item xs={4}>
                              <GeoLocationHandler
                                locationTitle="Country"
                                id="Country"
                                name="Country"
                                isCountry
                                onChange={(e, name) => {
                                  setCountryGeoId(e);
                                  setCountryName(name);
                                }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <GeoLocationHandler
                                locationTitle="State"
                                onChange={(e, name) => {
                                  setStateGeoId(e);
                                  setStateName(name);
                                }}
                                geoId={countryGeoId}
                                id="State"
                                name="State"
                                isState
                              />
                            </Grid>

                            <Grid item xs={4}>
                              <GeoLocationHandler
                                locationTitle="City"
                                onChange={(e, name) => {
                                  setCityGeoId(e);
                                  setCityName(name);
                                }}
                                geoId={stateGeoId}
                                id="City"
                                name="City"
                                isCity
                              />
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Box>
                    </Container>
                  </Grid>

                  {/* //* /////////////////////////////////// */}

                  <Grid item xs={12}>
                    <TextField
                      sx={{ width: "75%" }}
                      id="image"
                      name="image"
                      type="file"
                      helperText={uploadMessage && uploadMessage}
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                      }}
                    />
                    <Button
                      variant="outlined"
                      sx={{ width: "22%", height: "4em", marginLeft: "3%" }}
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

                {/* <Box display={"flex"} justifyContent={"center"} mb={2}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      const token = credentialResponse.credential;
                      const decoded = jwtDecode(token);
                      console.log("decoded", decoded);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    theme="filled_blue"
                    size="large"
                    // width="400px"
                    text="signup_with"
                  />
                </Box> */}

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" onClick={handleOpen}>
                      Registration rules
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>

                {status
                  ? message && <Alert severity="success">{message}</Alert>
                  : message && <Alert severity="error">{message}</Alert>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      {/* //* /////////////////////////////////////////////////// */}
      {/* //* Modal registration rules */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registration Rules
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>User Name Validation: </b>
            <br />
            1. The username is between 4 and 25 characters.
            <br />
            2. It must start with a letter. <br />
            3. It can only contain letters, numbers, and the underscore
            character. <br />
            4. It cannot end with an underscore character.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Password Validation:</b> <br />
            at least: <br />
            1. Eight characters.
            <br />
            2. One uppercase letter.
            <br />
            3. One lowercase letter.
            <br />
            4. One number.
            <br />
            5. One special character:
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
