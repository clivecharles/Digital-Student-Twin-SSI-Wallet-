import { React, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

//components
import Textfield from "../../../components/FormsUI/textField";
import DateTimePicker from "../../../components/FormsUI/dateTimePicker";
import Button from "../../../components/FormsUI/subButton";
import RadioButton from "../../../components/FormsUI/radioButton";

//style
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  titelStyle: {
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 16,
    color: "#bb1c31",
  },
}));
//Function to validate the input provided by the user accordinly as string, number, date
//Makes sure the input is not empty otherwise error message will be shown
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Please provide your first name"),
  lastName: Yup.string().required("Please provide your last name"),
  dateOfBirth: Yup.date().required("Please provide your date of birth"),
  semesterPeriod: Yup.string().required(
    "Please provide select the Educational level"
  ),
  matrikulationNr: Yup.number()
    .integer()
    .typeError("Please enter your matrikulation Nr ")
    .required("Please provide your Matrikulation Nr"),
  educationalInstitution: Yup.string().required(
    "Please provide the Educational Institution"
  ),
  educationalLevel: Yup.string().required(
    "Please provide select the Educational level"
  ),
  faculty: Yup.string().required("Please provide the faculty name"),
  program: Yup.string().required("Please provide program you are visiting"),
  expiryDate: Yup.date().required(
    "Please provide the expiry date of your Certificate of study"
  ),
});

//certificate of study application
const HolderCertificateOfStudy = (props) => {
  const [loading, setLoading] = useState(false);
  const radioOptions_edLvl = [
    { key: "Bachelors", value: "Bachelors" },
    { key: "Masters", value: "Masters" },
  ];

  const radioOptions_sem = [
    { key: "FS", value: "FS" },
    { key: "HS", value: "HS" },
  ];
  const classes = useStyles();

  return (
    <Box p={5}>
      <Paper elevation={15}>
        <Grid item container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Formik
                  initialValues={props.data}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(values) => {
                    setLoading(true);
                    //to send the entered values and the type of application filled
                    props.next(values, true, "certificateOfStudy");
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid container item spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            className={classes.titelStyle}
                          >
                            Certificate of study Application
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5">Personal Details</Typography>
                          <Typography
                            className={classes.textSmall}
                            variant="caption"
                          >
                            {
                              "Your Swiss e-ID will be sent along with this application to prove your identity"
                            }
                          </Typography>
                          <Divider />
                        </Grid>

                        <Grid item xs={6}>
                          <Textfield name="firstName" label="First Name" />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="lastName" label="Last Name" />
                        </Grid>
                        <Grid item xs={12}>
                          <DateTimePicker
                            name="dateOfBirth"
                            label="Date of Birth"
                          />
                        </Grid>
                      </Grid>

                      <Grid container item spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            Education Details
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            name="matrikulationNr"
                            label="Matrikulation Nr"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <RadioButton
                            name="semesterPeriod"
                            label="Semester Period"
                            options={radioOptions_sem}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            name="educationalInstitution"
                            label="Educational Institution"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <RadioButton
                            name="educationalLevel"
                            label="Educational Level"
                            options={radioOptions_edLvl}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="faculty" label="Faculty" />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="program" label="Program" />
                        </Grid>
                        <Grid item xs={12}>
                          <DateTimePicker
                            name="expiryDate"
                            label="Expiry Date"
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ alignItems: "center" }}>
                          <Box sx={{ m: 1, position: "relative" }}>
                            <Button variant="contained" disabled={loading}>
                              Next
                            </Button>
                            {loading && (
                              <CircularProgress
                                size={24}
                                sx={{
                                  color: "white",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  marginTop: "-12px",
                                  marginLeft: "-12px",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HolderCertificateOfStudy;
