import React, { useState } from "react";

//MUI STUFF
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/FormsUI/textField";

//Components
import Button from "../components/FormsUI/subButton";

//api call to login the issuer
import { LoginIssuer } from "../components/API/affinidiAdminApi";

//style
const useStyles = makeStyles({
  paperStyle: {
    padding: 30,
    height: "45vh",
    width: 300,
    margin: "100px auto",
    backgroundColor: "#f1e6e2",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  heading: {
    fontFamily: "Lucida Sans Unicod",
  },
  buttonStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

const IssuerLogin = (props) => {
  const [error, setError] = useState(false);

  //iniital input data is empty
  const INITIAL_DATA = {
    userName: "",
    password: "",
  };

  //form validation
  const FORM_VALIDATION = Yup.object().shape({
    userName: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const classes = useStyles();

  return (
    <Box pl={25}>
      <Paper className={classes.paperStyle} elevation={10}>
        <Grid container>
          <Grid item sm={12} align="center">
            <Avatar>
              <LockRoundedIcon />
            </Avatar>
            <br />
          </Grid>
          <Grid item sm={12} align="center">
            <Typography variant="h3" className={classes.heading}>
              Issuer Login
            </Typography>
            <br />
            <Formik
              initialValues={INITIAL_DATA}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                //here we send the values entered in the login form of the issuer to the login issuer function
                //this checks if the account exists
                LoginIssuer(values, props.history).then((res) => {
                  if (res === "error") {
                    setError(true);
                  }
                });
              }}
            >
              <Form>
                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Textfield name="userName" label="Userame" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <Button>
                        <Typography className={classes.buttonStyle}>
                          Login
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Typography className={classes.errorText}>
                        Please enter a correct username and password.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <br />
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default IssuerLogin;
