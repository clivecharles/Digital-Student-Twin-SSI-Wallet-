import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";

//style
import classes from "./idtype.module.css";

//basic information displayed on the form select page about the Swiss e-ID
const info = {
  title: "Swiss e-ID",
  description:
    "The Swiss e-ID verifiable credential helps you to prove your identity online. This also helps to remove the physical presence required in most e-government services such as when renewing your residence permit",
};

const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

const SwissEid = (props) => {
  //The credential details of a swiss e-id permit
  const data = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    idType: "",
    gender: "",
  };

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
              <BadgeIcon fontSize="large" />
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

export default SwissEid;
