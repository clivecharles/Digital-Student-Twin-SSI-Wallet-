import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

//icon
import HomeIcon from "@mui/icons-material/Home";

//components
import Checkbox from "../../../../components/FormsUI/checkBox";
import Button from "../../../../components/FormsUI/subButton";

//componets

//data
const data = {
  firstName: false,
  lastName: false,
  dateOfBirth: false,
  gender: false,
  nationality: false,
  residencePermitCategory: false,
  expiryDate: false,
  issuer: false,
  issueDate: false,
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.boolean(),
  lastName: Yup.boolean(),
  dateOfBirth: Yup.boolean(),
  gender: Yup.boolean(),
  nationality: Yup.boolean(),
  residencePermitCategory: Yup.boolean(),
  expiryDate: Yup.boolean(),
  issuer: Yup.boolean(),
  issueDate: Yup.boolean(),
});

const ShareResidencePermit = (props) => {
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
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={3} sm={3}>
          <HomeIcon sx={{ fontSize: 50 }} />
        </Grid>
        <Box pt={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Residence Permit
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
                      <Checkbox
                        name="expiryDate"
                        legend=" "
                        label="Expiry Date"
                        styleRed
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="issueDate"
                        legend=" "
                        label="Issue Date"
                        styleRed
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="dateOfEntry"
                        legend=" "
                        label="Date of Entry"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="birthPlace"
                        legend=" "
                        label="Birth place"
                      />
                    </Grid>

                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="residencePermitCategory"
                        legend=" "
                        label="Residence Permit Category"
                        styleRed
                      />
                    </Grid>

                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="nationality"
                        legend=" "
                        label="Nationality"
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

export default ShareResidencePermit;
