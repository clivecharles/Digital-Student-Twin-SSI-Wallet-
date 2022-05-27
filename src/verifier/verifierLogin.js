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
import { LoginVerifier } from "../components/API/affinidiAdminApi";

//Styles
const useStyles = makeStyles({
  paperStyle: {
    padding: 30,
    height: "45vh",
    width: 300,
    margin: "100px auto",
    backgroundColor: "#cbe4f9",
    color: "black",
    alignContent: "center",
  },
  title: {
    fontFamily: "Lucida Grande",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  buttonStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

//verifier login account
const VerifierLogin = (props) => {
  const [error, setError] = useState(false);

  const INITIAL_DATA = {
    userName: "",
    password: "",
  };

  //validation of the input
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
            <Typography variant="h3" className={classes.title}>
              Verifier Login
            </Typography>
            <br />
            <Formik
              initialValues={INITIAL_DATA}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                LoginVerifier(values, props.history).then((res) => {
                  if (res === "error") {//if anthing other then the provided username and password is given
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
                  {error && (//error message when wrong credentials
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

export default VerifierLogin;
