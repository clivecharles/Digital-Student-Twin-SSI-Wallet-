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

//custom componets for checkbox and button
import Checkbox from "../../../../components/FormsUI/checkBox";
import Button from "../../../../components/FormsUI/subButton";

//data
const data = {
  firstName: false,
  lastName: false,
  dateOfBirth: false,
  streetAddress: false,
  city: false,
  region: false,
  postalCode: false,
  issuer: false,
  issueDate: false,
  expiryDate: false,
};


const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.boolean(),

  lastName: Yup.boolean(),
  dateOfBirth: Yup.boolean(),
  streetAddress: Yup.boolean(),
  city: Yup.boolean()
    .oneOf([true], "First Name attribute is a required credential")
    .required("test"),
  region: Yup.boolean(),
  postalCode: Yup.boolean(),
  issuer: Yup.boolean(),
  issueDate: Yup.boolean(),
  expiryDate: Yup.boolean(),
});

//creating a checkbox list for address proof credentials
const ShareAddressProof = (props) => {
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
              Address Proof
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
                //here the selected credentials are submitted
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
                        name="streetAddress"
                        legend=" "
                        label="Street Address"
                        styleRed
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox name="city" legend=" " label="City" styleRed />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="region"
                        legend=" "
                        label="Region"
                        styleRed
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Checkbox
                        name="postalCode"
                        legend=" "
                        label="Postal Code"
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

export default ShareAddressProof;
