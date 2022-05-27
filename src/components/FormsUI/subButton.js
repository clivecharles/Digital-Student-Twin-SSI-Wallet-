import React from "react";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";

//this button is connected to formik and used to Handling form submission
const SubButton = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  //handle a form submission
  const handleSubmit = () => {
    submitForm();
  };

  //properties of the button
  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };

  // the actual button with the properties
  return <Button {...configButton}>{children}</Button>;
};

export default SubButton;
