import { React, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

//components
import Textfield from "../../../components/FormsUI/textField";
import DateTimePicker from "../../../components/FormsUI/dateTimePicker";
import Button from "../../../components/FormsUI/subButton";

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
  ahvNr: Yup.string().required("Please provide your street address"),
  bagNr: Yup.number()
    .integer()
    .typeError("Must only consist of numvers")
    .required("Please provide the postal code of your area"),
  insuranceNr: Yup.number()
    .integer()
    .typeError("Must only consist of numvers")
    .required("Please provide the postal code of your area"),
  expiryDate: Yup.date().required("Please provide your date of birth"),
});

const HolderInsuranceProof = (props) => {
  const [loading, setLoading] = useState(false);

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
                    props.next(values, true, "InsuranceProof");
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
                            Insurance proof Application
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            Insurance Details
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
                          <Textfield name="ahvNr" label="AHV Nr" />
                        </Grid>

                        <Grid item xs={4}>
                          <Textfield name="bagNr" label="BAG Nr" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="insuranceNr" label="Insurance Nr" />
                        </Grid>
                        <Grid item xs={4}>
                          <DateTimePicker
                            name="expiryDate"
                            label="Expiry Date"
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}></Grid>

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

export default HolderInsuranceProof;
