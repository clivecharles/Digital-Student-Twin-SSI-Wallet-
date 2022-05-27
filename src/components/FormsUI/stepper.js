import { React, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

//this component represents the stepper we see in the application form when adding a verifiable credential
const FormStepper = (props) => {
  return (
    <Box pt={2}>
      <Paper>
        <Box p={2}>
          <Stepper activeStep={props.step}>
            <Step>
              <StepLabel>Holder Information</StepLabel>
            </Step>

            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormStepper;
