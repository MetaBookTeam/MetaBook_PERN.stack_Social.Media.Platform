import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
} from "../../Service/redux/reducers/auth/authSlice";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  //* Redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const state = useSelector((state) => {
  //   return { auth: state.auth.auth };
  // });
  // console.log(auth);
  // auth.isLoggedIn, auth.token, auth.userId;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  //* show/hide Password

  const [showPassword, setShowPassword] = useState(false);
  // const [passwordMessage, setPasswordMessage] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // console.log("loginPassword", loginPassword);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    // console.log("event.target.value", event.target.value);
    // setLoginPassword(event.target.value);
  };
  //===============================================================

  const login = async (event) => {
    event.preventDefault();
    // setPasswordMessage("");

    const data = new FormData(event.currentTarget);

    try {
      const result = await axios.post("https://meraki-academy-project-5.onrender.com/users/login", {
        email: data.get("email"),
        // password: data.get("password"),
        password: loginPassword,
      });
      if (result.data) {
        setStatus(true);
        setMessage(result.data.message);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setStatus(false);
        return setMessage(error.response.data.message);
      }
      setStatus(false);
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (auth.isLoggedIn) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [auth.isLoggedIn]);

  //===============================================================
  //* Signup and Login with Google

  const googleLoginHandler = (decoded) => {
    const user_name = decoded.name;
    const first_name = decoded.given_name;
    const last_name = decoded.family_name;
    const password = decoded.sub;
    const email = decoded.email;
    const image = decoded.picture;

    // usersRouter.post("/register", register);
    axios
      .post("https://meraki-academy-project-5.onrender.com/users/register", {
        user_name,
        first_name,
        last_name,
        password,
        email,
        image,
      })
      .then((result) => {
        axios
          .post("https://meraki-academy-project-5.onrender.com/users/login", {
            email,
            password,
          })
          .then((result) => {
            if (result.data) {
              setStatus(true);
              setMessage(result.data.message);
              dispatch(setLogin(result.data.token));
              dispatch(setUserId(result.data.userId));

              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else throw Error;
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              setStatus(false);
              return setMessage(error.response.data.message);
            }
            setStatus(false);
            setMessage("Error happened while Login, please try again");
          });
      })
      .catch((error) => {
        if (!error.response.data.success) {
          axios
            .post("https://meraki-academy-project-5.onrender.com/users/login", {
              email,
              password,
            })
            .then((result) => {
              if (result.data) {
                setStatus(true);
                setMessage(result.data.message);
                dispatch(setLogin(result.data.token));
                dispatch(setUserId(result.data.userId));

                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else throw Error;
            })
            .catch((error) => {
              if (error.response && error.response.data) {
                setStatus(false);
                return setMessage(error.response.data.message);
              }
              setStatus(false);
              setMessage("Error happened while Login, please try again");
            });
        } else {
          console.log(error);
        }
      });
  };

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
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                onSubmit={login}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                /> */}

                {/* <Grid item xs={12}> */}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                  {/* <FormHelperText sx={{ color: "red" }}>
                      {passwordMessage && passwordMessage}
                    </FormHelperText> */}
                </FormControl>
                {/* </Grid> */}

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 2, mt: 2 }} />

                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={3}
                >
                  <Typography component="h1" variant="h5">
                    Or Signup and Login with Google
                  </Typography>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      const token = credentialResponse.credential;
                      const decoded = jwtDecode(token);
                      console.log("decoded", decoded);
                      googleLoginHandler(decoded);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    theme="filled_blue"
                    size="large"
                    // width="400px"
                  />
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />

                {status
                  ? message && <Alert severity="success">{message}</Alert>
                  : message && <Alert severity="error">{message}</Alert>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
