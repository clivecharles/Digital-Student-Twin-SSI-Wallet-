import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

//api call to generate request token from the issuer
import { generatedRequestTokenIssuer } from "../../../components/API/affinidiAdminApi";

//style
import classes from "./idtype.module.css";

//basic information displayed on the form select page about the residenece permit
const info = {
  title: "Residence Permit",
  description:
    "You can apply for a residence permit verifiable credential to prove your residency in Switzerland digitally",
};

const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

const ResidencePermit = (props) => {
  //to store initial data such as name ,last name and date of birth if this data exists
  // the user does not need to re-enter the information when once provided in the swiss e-id application
  const initData = props.data;

  //The credential details of a residenc permit
  const data = {
    firstName: initData.firstName ? initData.firstName : "",
    lastName: initData.lastName ? initData.lastName : "",
    gender: "",
    nationality: "",
    dateOfBirth: initData.dateOfBirth ? initData.dateOfBirth : "",
    remark: "",
    birthPlace: "",
    residencePermitCategory: "",
    dateOfEntry: "",
    issueDate: "",
    expiryDate: "",
  };

  //specifing that we need an id document to be submitted with every VC application by the student
  const requiredData = ["IDDocumentCredentialPersonV1"];

  return (
    <Box pt={2}>
      <Paper
        sx={{
          p: 1,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Box p={1}>
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={12}>
              <Typography variant="h6" className={classes.title}>
                {info.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider />
              <br />
            </Grid>
          </Grid>
          <Grid container item sm={12} xs={12} spacing={1}>
            <Grid container {...gridConfig} item xs={2} sm={2}>
              <HomeRoundedIcon fontSize="large" />
            </Grid>
            <Grid container item sm={8} xs={8}>
              <Grid item xs={12} sm={12}>
                <Typography>{info.description}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              {...gridConfig}
              direction="column"
              item
              sm={2}
              xs={2}
            >
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  component={Link}
                  // to generate the request token from the issuer
                  //this is required in order to respond with the e-ID information
                  onClick={() => generatedRequestTokenIssuer(requiredData)}
                  to={{
                    pathname: "/createVC", //to redirect to the application form
                    state: data, //initial data
                  }}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResidencePermit;
