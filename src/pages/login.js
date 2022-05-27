import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

//MUI STUFF
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

//for validation
import { Formik, Form } from "formik";
import * as Yup from "yup";

//custom button component
import Button from "../components/FormsUI/subButton";

//custom text field component
import Textfield from "../components/FormsUI/textField";

//context
import { CredentialContext } from "../helper/credentialContext";

//api call to create an affinidi wallet
import { LoginUser } from "../components/API/affinidiUserAPI";

//styles
const useStyles = makeStyles({
  paperStyle: {
    padding: 30,
    height: "45vh",
    width: 300,
    margin: "100px auto",
    backgroundColor: "#d0ebdd",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  title: {
    fontFamily: "Lucida Grande",
  },
  buttonStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

//student login page
const Login = (props) => {
  const [error, setError] = useState(false);
  const [credential, setCredentials] = useContext(CredentialContext);

  //to set the user name in sidebar
  const setUsername = (username) => {
    setCredentials(username);
  };

  const INITIAL_DATA = {
    userName: "",
    password: "",
  };

  //for validating the input
  const FORM_VALIDATION = Yup.object().shape({
    userName: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const classes = useStyles();

  const gridConfig = {
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    spacing: 0,
  };

  return (
    <Box pl={25}>
      <Paper className={classes.paperStyle} elevation={10}>
        <Grid container {...gridConfig}>
          <Grid item sm={12}>
            <Avatar>
              <LockRoundedIcon />
            </Avatar>
            <br />
          </Grid>
          <Grid item sm={12} align="center">
            <Typography variant="h3" className={classes.title}>
              Student Login
            </Typography>
            <br />
            <Formik
              initialValues={INITIAL_DATA}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                setUsername(values.userName);
                LoginUser(values, props.history).then((res) => {
                  if (res === "error") {
                    // in this case if the user name and password are provided by the issuer or the verifier an error is displayed
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
                <small>
                  dont have an account ? sign up <Link to="/">here</Link>
                </small>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
