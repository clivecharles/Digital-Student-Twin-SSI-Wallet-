import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

//Component

const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

//confirmation screen
const Confirmation = (props) => {
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
              <Typography variant="h6">Application Sent</Typography>
              <br />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="body1">
                <Divider />
                <br />
                Your Application with the provided details are sent to the
                appropriate authority for processing. Once the details provided
                are valid. You will receive the proof notification to add to
                your wallet
              </Typography>
            </Grid>
            <Grid>
              <br />
              <Button variant="contained" component={Link} to="/home">
                OK
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Confirmation;
