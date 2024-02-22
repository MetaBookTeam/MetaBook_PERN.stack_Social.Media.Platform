import React, { useEffect, useState, useRef } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// import { makeStyles } from "@material-ui/core/styles";

import Geonames from "geonames.js";
import PropTypes from "prop-types";

const geonames = new Geonames({
  username: "thalesandrade",
  lan: "en",
  encoding: "JSON",
});

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     minWidth: "100%",
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function GeoLocationHandler(props) {
  //   const classes = useStyles();
  const { locationTitle, geoId, onChange, isCountry } = props;
  const [options, setOptions] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  // const [labelWidth, setLabelWidth] = useState(0);

  // useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  useEffect(() => {
    try {
      const data = async () => {
        (await isCountry)
          ? geonames.countryInfo({}).then((res) => {
              // console.log(res);
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

  const handleChange = (e) => {
    setCurrentItem(e.target.value);
    onChange(e.target.value);
  };

  return (
    // <FormControl variant="outlined" className={classes.formControl}>
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} id="outlined-label">
        {locationTitle}
      </InputLabel>

      <Select
        labelId="outlined-label"
        id="select-outlined"
        value={currentItem}
        onChange={handleChange}
        // labelWidth={labelWidth}
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
