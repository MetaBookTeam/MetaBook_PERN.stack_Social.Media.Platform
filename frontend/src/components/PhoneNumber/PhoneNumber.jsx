import React from "react";
import { MuiTelInput } from "mui-tel-input";

const PhoneNumber = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return <MuiTelInput value={value} onChange={handleChange} />;
};

export default PhoneNumber;
