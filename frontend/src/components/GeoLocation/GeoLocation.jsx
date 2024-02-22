import React, { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

// import { CssBaseline, Container, Grid } from "@material-ui/core/";
// import { makeStyles } from "@material-ui/core/styles";

import GeoLocationHandler from "./GeoLocationHandler";

// const useStyles = makeStyles((theme) => ({
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
// }));

const GeoLocation = () => {
  //   const classes = useStyles();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  console.log({
    country,
    state,
    city,
  });

  return (
    <Container component="main" maxWidth="lg">
      {/* <CssBaseline /> */}
      {/* <div className={classes.paper}>
        <form className={classes.form}> */}
      <Box>
        <FormControl>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <GeoLocationHandler
                locationTitle="Country"
                id="Country"
                name="Country"
                isCountry
                onChange={setCountry}
              />
            </Grid>
            <Grid item xs={4}>
              <GeoLocationHandler
                locationTitle="State"
                onChange={setState}
                geoId={country}
                id="State"
                name="State"
              />
            </Grid>

            <Grid item xs={4}>
              <GeoLocationHandler
                locationTitle="City"
                onChange={setCity}
                geoId={state}
                id="City"
                name="City"
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};

export default GeoLocation;
