import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

//all application types that can be received
import CertificiateOfStudyApplicant from "./certificateOfStudyApplicant";
import AddressProofApplicant from "./addressProofApplicant";
import InsuranceProofApplicant from "./insuranceProofApplicant";
import SwissEidApplicant from "./swissEidApplicant";
import ResidencePermitApplicant from "./residencePermitApplicant";

//conetxt
//import { CredentialProvider } from "../../helper/credentialContext";

//the main application details component
const ApplicantDetails = (props) => {
  const { state } = props.location;

  const applicantType = state.data;

  return (
    <Box p={10}>
      <Paper elevation={15}>
        <Box p={4}>
          <Grid item container>
            <Grid item sm={5}>
              <Typography variant="h4" gutterBottom component="div">
                Application Information
              </Typography>
              <Divider />
              <br />
            </Grid>
            <Grid item sm={4} />
            <Grid item>
              <Button
                component={Link}
                variant="outlined"
                to={{
                  pathname: "/issuerHome",
                }}
                startIcon={<CloseIcon />}
              />
            </Grid>

            <Grid item sm={12}>
              {applicantType.matrikulationNr && (
                //depending on the applicant type the respective application is opened when it is present
                <CertificiateOfStudyApplicant data={applicantType} />
              )}
              {applicantType.streetAddress && (
                <AddressProofApplicant data={applicantType} />
              )}
              {applicantType.ahvNr && (
                <InsuranceProofApplicant data={applicantType} />
              )}
              {applicantType.idType && (
                <SwissEidApplicant data={applicantType} />
              )}
              {applicantType.residencePermitCategory && (
                <ResidencePermitApplicant data={applicantType} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ApplicantDetails;
/*You will need to sign your VC to add some value to it. Without the signature, credential would be worthless.

Take the example of VC issued for 'Covid -ve'. If this credential is not signed by a ligitimate healthcare organization it would be of no help. Hence it is important. */
/** {Object.keys(props.data).map((key, holder) => {
                  <Textfield
                    disabled
                    id="standard-read-only-input"
                    defaultValue={props.data[key]}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                  />;
                })} */
/**  {props.unsignedVC ? (
        <SignCredentials data={props.data} next={props.next} />
      ) : null} */
