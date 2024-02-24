import React, { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import GeoLocationHandler from "./GeoLocationHandler";

const GeoLocation = () => {
  const [countryGeoId, setCountryGeoId] = useState("");
  const [countryName, setCountryName] = useState("");
  const [stateGeoId, setStateGeoId] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityGeoId, setCityGeoId] = useState("");
  const [cityName, setCityName] = useState("");

  // console.log({
  //   countryGeoId,
  //   stateGeoId,
  //   cityGeoId,
  //   countryName,
  //   stateName,
  //   cityName,
  // });

  return (
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
  );
};

export default GeoLocation;
