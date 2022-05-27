import React from "react";

//react User interface components
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name); //An object that contains relevant computed metadata about the name field
  //When a DateTimePicker is defined in a component this function is called to handles the properties passed
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  //this used to handle errors
  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  // here we the actual TextField is redered using the properties we have passed
  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
