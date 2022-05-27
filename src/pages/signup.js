import React from "react";

//MUI STUFF
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/FormsUI/textField";

//Components
import Button from "../components/FormsUI/subButton";
import { SignUpUser } from "../components/API/affinidiUserAPI";

//styles
const useStyles = makeStyles({
  paperStyle: {
    backgroundColor: "#f2f2f2",
    padding: 30,
    height: "65vh",
    width: 300,
    margin: "100px auto",
  },
  title: {
    fontFamily: "Lucida Grande",
  },
  buttonStyle: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

//signup page // this is the page where the stundent can create a student wallet account
const SignUp = (props) => {
  const INITIAL_DATA = {
    userName: "",
    password: "",
  };

  //for validation
  const FORM_VALIDATION = Yup.object().shape({
    userName: Yup.string().required("Please enter your username"),
    password: Yup.string() // here we make sure the password is atleast 8 characters with numbers and letters
      .required("Please enter your password")
      .min(8, "Password too short")
      .test(
        "isValidPass",
        <>
          <Typography variant="subtitle2" gutterBottom>
            Password must contain
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            * atleast 8 characters
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            * Upper & Lower case letters a-z, A-Z
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            * Numbers 0-9
          </Typography>
        </>,
        (value, context) => {
          //to check if the password entered follows the given restrictions
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [hasLowerCase, hasUpperCase, hasNumber];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match" //error message when password is not the same
    ),
  });

  const classes = useStyles();

  return (
    <Box pl={25}>
      <Paper className={classes.paperStyle} elevation={10}>
        <Grid container>
          <Grid item sm={12} align="center">
            <Avatar>
              <AccountBalanceWalletIcon />
            </Avatar>
            <br />
          </Grid>
          <Grid item sm={12} align="center">
            <Typography variant="h4" className={classes.title}>
              Create Your Student Wallet
            </Typography>
            <br />
            <Formik
              initialValues={INITIAL_DATA}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                //here we call the sign up api with the data provided in the sign up form
                SignUpUser(values, props.history);
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
                  <Grid item xs={12}>
                    <Textfield
                      name="passwordConfirmation"
                      label="Password Confirmation"
                      type="password"
                    />
                  </Grid>
                  <br />
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <Button>
                        <Typography className={classes.buttonStyle}>
                          Create Account
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <br />
                <small>
                  Already have an account ? Login <Link to="/login">here</Link>
                </small>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SignUp;
