import React, { useEffect, useState, useRef } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Geonames from "geonames.js";
import PropTypes from "prop-types";

const geonames = new Geonames({
  username: "thalesandrade",
  lan: "en",
  encoding: "JSON",
});

export default function GeoLocationHandler(props) {
  const { locationTitle, geoId, onChange, isCountry, isState, isCity } = props;
  const [options, setOptions] = useState([]);
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    try {
      const data = async () => {
        (await isCountry)
          ? geonames.countryInfo({}).then((res) => {
              setOptions(res.geonames);
            })
          : geonames.children({ geonameId: geoId }).then((res) => {
              if (res.totalResultsCount) setOptions(res.geonames);
            });
      };
      data();
    } catch (err) {
      console.error(err);
    }
  }, [geoId, isCountry]);

  const inputLabel = useRef(null);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} id="outlined-label">
        {locationTitle}
      </InputLabel>

      <Select
        labelId="outlined-label"
        id="select-outlined"
        value={currentItem}
        onChange={(e) => {
          setCurrentItem(e.target.value);
          options.find((v) => {
            if (isCountry) {
              if (e.target.value === v.geonameId) {
                onChange(e.target.value, v.countryName);
              }
            } else if (isState) {
              if (e.target.value === v.geonameId) {
                onChange(e.target.value, v.name);
              }
            } else if (isCity) {
              if (e.target.value === v.geonameId) {
                onChange(e.target.value, v.name);
              }
            }
          });
        }}
        sx={{ width: "120px" }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {options.map((v, index) => (
          <MenuItem key={index} value={v.geonameId}>
            {isCountry ? v.countryName : v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

GeoLocationHandler.propTypes = {
  locationTitle: PropTypes.string,
  geoId: PropTypes.node,
  isCountry: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

GeoLocationHandler.defaultProps = {
  onChange: undefined,
};
