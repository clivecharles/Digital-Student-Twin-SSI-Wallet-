import * as React from "react";
import { Link } from "react-router-dom";

//mui stuff
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

//From styles components to display the received applications
import ResidencePermitRenewalDetails from "./ApplicationType/residencePermitDetails";
import WorkPermitDetails from "./ApplicationType/workPermitDetails";

const ApplicationResponseDetails = (props) => {
  const { state } = props.location;

  const applicantType = state.data;

  return (
    <Box p={10}>
      <Paper elevation={15}>
        <Box p={4}>
          <Grid item container>
            <Grid item sm={5}>
              <Typography variant="h4" gutterBottom component="div">
                Applicant Information
              </Typography>
              <Divider />
              <br />
            </Grid>
            <Grid item sm={4} />
            <Grid item>
              <Button
                variant="outlined"
                component={Link}
                to={{
                  pathname: "/verifierHome",
                }}
                startIcon={<CloseIcon />}
              />
            </Grid>

            <Grid item sm={12}>
              {applicantType.applicationType === "Renew Residence Permit" && ( //here we check the application type we received an open the relevant application format
                <ResidencePermitRenewalDetails data={applicantType} />
              )}
              {applicantType.applicationType === "Apply Work Permit" && (
                <WorkPermitDetails data={applicantType} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ApplicationResponseDetails;
