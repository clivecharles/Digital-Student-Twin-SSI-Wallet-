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
import { green } from "@mui/material/colors";

//components
import Textfield from "../../../components/FormsUI/textField";
import DateTimePicker from "../../../components/FormsUI/dateTimePicker";
import Button from "../../../components/FormsUI/subButton";

//firebase storage
import { storage } from "../../../firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

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
  streetAddress: Yup.string().required("Please provide your street address"),
  city: Yup.string().required("Please provide the city you live in"),
  region: Yup.string().required("Please provide the region you live in"),
  postalCode: Yup.number()
    .integer()
    .typeError("Must only consist of numvers")
    .required("Please provide the postal code of your area"),
});
//address proof application
const HolderAddressProof = (props) => {
  const [imgUrl, setImgUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  //button hover style
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  //function to upload an image to firebase storage
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
        console.log("info", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          console.log(url);
        });
      }
    );
  };

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
                    values.imgUrl = imgUrl;
                    setLoading(true);
                    //to send the entered values and the type of application filled
                    props.next(values, true, "addressProof");
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
                            Address proof Application
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

                        <Grid item xs={6}>
                          <DateTimePicker
                            name="dateOfBirth"
                            label="Date of Birth"
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5">Address Details</Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Textfield
                            name="streetAddress"
                            label="Street Address"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <Textfield name="city" label="City" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="region" label="Region" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="postalCode" label="Postal Code" />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={12}>
                          <br />
                          <Typography variant="h5">
                            Additional Documents
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Please provide a proof of your stay in Switzerland.
                            Accepted documents are:
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              * Rental Agreement
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
                              sx={buttonSx}
                              disabled={loading || !imgUrl}
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
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HolderAddressProof;
