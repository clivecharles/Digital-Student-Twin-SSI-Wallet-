import React from "react";

//react User interface components
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

//Formik is a small library used for
//Getting values in and out of form state
//Validation and error messages
//Handling form submission
import { useField, useFormikContext } from "formik";

//defining the style for text
const useStyles = makeStyles({
  text: {
    color: "red",
  },
});

//When a checkbox is defined in a component this function is called to handles the properties passed
const CheckboxWrapper = ({ name, label, legend, styleRed, ...otherPros }) => {
  const classes = useStyles(); //styles
  const { setFieldValue } = useFormikContext(); // to connect with formik getting values in and out
  const [field, meta] = useField(name); //An object that contains relevant computed metadata about a field

  const handleChange = (evt) => {
    const { checked } = evt.target; //checked will be a bolean value
    setFieldValue(name, checked);
  };

  //properties of the checkbox
  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  //this used to handle errors
  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  // here we the actual checkbox is redered using the properties we have passed
  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={
            <Typography
              variant="body2"
              color="textSecondary"
              className={styleRed ? classes.text : null}
            >
              {label}
            </Typography>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
