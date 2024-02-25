import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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

  const login = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email: data.get("email"),
        password: data.get("password"),
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
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
