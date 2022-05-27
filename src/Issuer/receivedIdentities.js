import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";

//for generating a random id
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const ReceivedIdentities = (props) => {
  //store all the identites received from students
  const [data, setdata] = useState(props);

  var heading;

  //for setting the heading in the pending application item
  if (props.data.matrikulationNr) {
    heading = "Certifiacte of Study";
  }
  if (props.data.postalCode) {
    heading = "Address Proof";
  }
  if (props.data.idType) {
    heading = "Swiss e-ID";
  }
  if (props.data.ahvNr) {
    heading = "Insurance";
  }
  if (props.data.residencePermitCategory) {
    heading = "Residence Permit";
  }

  return (
    <Box pt={1} pl={5}>
      <Paper>
        <Box p={2}>
          <Grid item container>
            <Grid item sm={12}>
              <Typography variant="h6">{heading}</Typography>
              <Divider />
              <br />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12}>
              Application ID: {makeid(10)}
            </Grid>

            <Grid item sm={12} xs={12}>
              <Box pt={2}>
                <Button
                  variant="contained"
                  component={Link}
                  to={{
                    // link to open the component applicantDetails with the data received
                    pathname: "/applicantDetails",
                    state: data,
                  }}
                >
                  View More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReceivedIdentities;
