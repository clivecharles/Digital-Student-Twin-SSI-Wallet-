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

//firbase iamge uplaod functions
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

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Please provide your first name"),
  lastName: Yup.string().required("Please provide your last name"),
  dateOfBirth: Yup.date().required("Please provide your date of birth"),
  gender: Yup.string().required("Please select your gender"),
  birthPlace: Yup.string().required("Please enter your birth place"),
  remark: Yup.string().required(
    "Please enter the remark as in your residence permit card"
  ),
  nationality: Yup.string().required("Please provide your nationality"),
  residencePermitCategory: Yup.string().required(
    "Please provide your residence permit category"
  ),
  dateOfEntry: Yup.date().required(
    "Please provide your entry date to Switzerland"
  ),
  issueDate: Yup.date(),
  expiryDate: Yup.date(),
});

const HolderResidencePermit = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const radioOptions = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  //to store any image uploaded
  const [imgUrl, setImgUrl] = useState();

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
          //console.log(url);
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
                    setLoading(true);
                    //url of the image uploaded
                    values.imgUrl = imgUrl;
                    //to send the entered values and the type of application filled
                    props.next(values, true, "residencePermit");
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
                            Residence permit proof application
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            Residence Permit Details
                          </Typography>
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
                          <Textfield name="firstName" label="First name" />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="lastName" label="Last name" />
                        </Grid>

                        <Grid item xs={6}>
                          <DateTimePicker
                            name="dateOfBirth"
                            label="Date of birth"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="birthPlace" label="Birth place" />
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButton
                            name="gender"
                            label="Gender"
                            options={radioOptions}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield name="nationality" label="Nationality" />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            name="residencePermitCategory"
                            label="Residence permit category"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DateTimePicker
                            name="dateOfEntry"
                            label="Date  of  entry  to  Switzerland"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DateTimePicker
                            name="issueDate"
                            label="Issue date of residence permit"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DateTimePicker
                            name="expiryDate"
                            label="Expiry date residence permit"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            name="remark"
                            label="Remark on Residence permit"
                          />
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
                            <Typography variant="subtitle1" fontWeight="bold">
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

export default HolderResidencePermit;
