import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

//When a Textfield is defined in a component this function is called to handles the properties passed
const Textfield = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name); //An object that contains relevant computed metadata about a field

  //properties of the Textfield
  const conifigTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  //used to handle errors
  if (mata && mata.touched && mata.error) {
    conifigTextfield.error = true;
    conifigTextfield.helperText = mata.error;
  }

  //the actual TextField is redered using the properties we have passed
  return <TextField {...conifigTextfield} />;
};

export default Textfield;
