import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

//icon
import SchoolIcon from "@mui/icons-material/School";

//components
import Checkbox from "../../../../components/FormsUI/checkBox";
import Button from "../../../../components/FormsUI/subButton";

//componets

//data
const data = {
  firstName: false,
  lastName: false,
  dateOfBirth: false,
  matrikulationNr: false,
  semesterPeriod: false,
  educationalInstitution: false,
  educationalLevel: false,
  faculty: false,
  program: false,
  expiryDate: false,
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.boolean(),
  lastName: Yup.boolean(),
  dateOfBirth: Yup.boolean(),
  matrikulationNr: Yup.boolean(),
  educationalInstitution: Yup.boolean(),
  educationalLevel: Yup.boolean(),
  faculty: Yup.boolean(),
  program: Yup.boolean(),
  issuer: Yup.boolean(),
  issueDate: Yup.boolean(),
  expiryDate: Yup.boolean(),
});

const ShareCertificateOfStudy = (props) => {
  return (
    <Paper
      sx={{
        p: 1,
        margin: "auto",
        maxWidth: 400,
        flexGrow: 1,
        display: "flex",
      }}
      elevation={10}
    >
      <Grid container item spacing={2} xs={12} sm={12}>
        <Grid item xs={3} sm={3}>
          <SchoolIcon sx={{ fontSize: 50 }} />
        </Grid>
        <Box pt={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Certificate of Study
            </Typography>
          </Grid>
        </Box>

        <Grid item xs={12} sm={12} container>
          <Grid item sm={12}>
            <Formik
              initialValues={data}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                values.claimId = props.data.id;

                props.handleSubmit(values);
              }}
            >
              <Form>
                <Box p={1}>
                  <Grid
                    item
                    container
                    spacing={1.2}
                    columnSpacing={1}
                    xs={12}
                    sm={12}
                  >
                    <Grid item xs={4} sm={4}>
                      <div>
                        <Checkbox name="faculty" legend=" " label="Faculty" />
                      </div>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox name="program" legend=" " label="Program" />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="matrikulationNr"
                        legend=" "
                        label="Matrikel Nr"
                        styleRed
                      />
                    </Grid>

                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="educationalInstitution"
                        legend=" "
                        label="Edu. Institution"
                        styleRed
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="educationalLevel"
                        legend=" "
                        label="Edu. Level"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="semesterPeriod"
                        legend=" "
                        label="Semester Period"
                        styleRed
                      />
                    </Grid>

                    <Grid item xs={5} sm={5}>
                      <Checkbox
                        name="expiryDate"
                        legend=" "
                        label="Expiry Date"
                        styleRed
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box p={0.5}>
                  <Grid item>
                    <Button>APPLY</Button>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ShareCertificateOfStudy;
