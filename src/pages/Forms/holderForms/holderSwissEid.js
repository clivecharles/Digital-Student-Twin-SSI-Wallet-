import { React, useState } from "react";

//form validation libaries
import { Formik, Form } from "formik";
import * as Yup from "yup";

//material ui stuff
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button as Btn } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

//components
import Textfield from "../../../components/FormsUI/textField";
import DateTimePicker from "../../../components/FormsUI/dateTimePicker";
import Button from "../../../components/FormsUI/subButton";
import RadioButton from "../../../components/FormsUI/radioButton";

//firbase iamge uplaod functions
import { storage } from "../../../firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

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

const HolderSwissEid = (props) => {
  //when button is loading

  //to the answers stored from the qualification questions in form of boolean values
  const [data, setData] = useState({
    q1: "false",
    q2: "false",
  });

  //the current step of the form
  const [currentStep, setCurrentStep] = useState(0);

  //to handle the next step
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    setCurrentStep((prev) => prev + 1);
  };

  // here the first step is the qulification questions then the actual swiss e-id form
  const steps = [
    <QualifyingQuestions next={handleNextStep} data={data} />,
    <SwissEidApplication
      data={props.data}
      requirements={data}
      next={props.next}
    />,
  ];

  return <div>{steps[currentStep]}</div>;
};

//validation of the question
const stepOneValidationSchema = Yup.object({
  q2: Yup.string().required("Please select an option"),
});

//qulification question form for swiss e-id
const QualifyingQuestions = (props) => {
  const classes = useStyles();

  //Answer option for Question 2
  const reqTwo = [
    { key: "Yes", value: "true" },
    { key: "No", value: "false" },
  ];

  //to handel the submit
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Box p={5}>
      <Paper elevation={15}>
        <Box p={5}>
          <Formik
            validationSchema={stepOneValidationSchema}
            initialValues={props.data}
            onSubmit={handleSubmit} //when form is submitted handleSubmit Function is called
          >
            {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        className={classes.titelStyle}
                      >
                        Are you qualified to apply for a Swiss e-ID? Please
                        answer the below question truthfully this will make your
                        case in the application process
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Have you applied for a Swiss e-ID during your Visa
                        process ?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <RadioButton name="q1" options={reqOne} />
            </Grid>*/}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Have you visted Kreisbüro for the initial registration ?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <RadioButton name="q2" options={reqTwo} />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={2}></Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={2}>
                      <Button>Next</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

//validation of the form inputs
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Please provide your first name"),
  lastName: Yup.string().required("Please provide your last name"),
  dateOfBirth: Yup.date().required("Please provide your date of birth"),
  nationality: Yup.string().required("Please provide your nationality"),
  // idType: Yup.string().required("Please provide your nationality"),
  gender: Yup.string().required("Please select your gender"),
});

const SwissEidApplication = (props) => {
  //radio button options
  //  const radioOptions = [{ key: "Student", value: "Student" }];
  const radioOptions_gender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  //to store any image uploaded
  const [imgUrl, setImgUrl] = useState();

  //loading button state
  const [loading, setLoading] = useState(false);

  //to uploade the image to firebase storage
  const uploadHandler = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    //send to server
    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progess
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };

  const classes = useStyles();

  return (
    <>
      {props.requirements.q2 === "false" && <NotApplicable />}
      {props.requirements.q2 === "true" && (
        //only if one of the questions answered with yes the form is shown
        <Box p={5}>
          <Paper elevation={15}>
            <Grid item container>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                {
                  <Container maxWidth="md">
                    <div className={classes.formWrapper}>
                      <Formik
                        initialValues={props.data}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values) => {
                          setLoading(true);
                          values.imgUrl = imgUrl; //store the image url in the object
                          values.idType = "Student";
                          props.next(values, true, "swiss e-id"); //to handle the values when form submitted
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
                                  Swiss e-ID Application
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6">
                                  Personal Details
                                </Typography>
                                <Divider />
                              </Grid>
                              <Grid item xs={6}>
                                <Textfield
                                  name="firstName"
                                  label="First Name"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Textfield name="lastName" label="Last Name" />
                              </Grid>

                              <Grid item xs={6}>
                                <DateTimePicker
                                  name="dateOfBirth"
                                  label="Date of Birth"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Textfield
                                  name="nationality"
                                  label="Nationality"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <RadioButton
                                  name="gender"
                                  label="Gender"
                                  options={radioOptions_gender}
                                />
                              </Grid>

                              {/*  <Grid item xs={6}>
                              /*  <RadioButton
                                  name="idType"
                                  label="Employment"
                                  options={radioOptions}
                                />
                      </Grid>*/}
                            </Grid>
                            <Grid container item spacing={2}>
                              <Grid item xs={12}>
                                <br />
                                <Typography variant="h6">
                                  Additional Documents
                                </Typography>
                                <Divider />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Please provide a proof of your residence in
                                  Switzerland. Provide the following documents .
                                  <Typography display="block">
                                    * Residence Permit
                                  </Typography>
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <input
                                  type="file"
                                  id="imageInput"
                                  onChange={uploadHandler}
                                ></input>
                              </Grid>
                            </Grid>

                            <Grid item xs={12}>
                              <Box sx={{ alignItems: "center" }}>
                                <Box sx={{ m: 1, position: "relative" }}>
                                  <Button
                                    variant="contained"
                                    disabled={loading}
                                  >
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
                }
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  );
};
const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

//shown when user is not applicable for a swiss e-id
const NotApplicable = (props) => {
  return (
    <Box p={20}>
      <Paper
        sx={{
          padding: 1,
          maxWidth: 600,
          flexGrow: 1,
          display: "flex",
          borderRadius: "4",
        }}
        elevation={5}
      >
        <Box p={3}>
          <Grid container item spacing={2} {...gridConfig}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Sorry! Not Qualified</Typography>
              <br />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="body1">
                <Divider />
                <br />
                You are not qualified to apply for an e-id. please visit your
                nearest kreisbüro for initial registration
              </Typography>
            </Grid>
            <Grid>
              <br />
              <Btn variant="contained" component={Link} to="/home">
                OK
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default HolderSwissEid;
