import React from "react";

import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

//When a Select field is defined in a component this function is called to handles the properties passed
const Select = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext(); // to connect with formik getting values in and out
  const [field, meta] = useField(name); //An object that contains relevant computed metadata about a field

  // handels any change to the select field
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  //Defining the properties of a select field
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  //handle errors
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  //here we the actual the select field is redered using the properties we have passed
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default Select;
