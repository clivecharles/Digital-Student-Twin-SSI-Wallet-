import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@mui/material";

// Component
//the component which displays all identities
import Identity from "../components/Identities/Identity";
//the e-id component
import EIDCard from "../components/Identities/eIDcard";
//the buttons for e-government and verifiable credentials
import ButtonLayout from "../components/Layout/homeScreenButtons";
//the pedning proof component showing all proofs received
import PendingProofs from "../data/pendingProofs";

//styles
const useStyles = makeStyles({
  paperStyle: {
    p: 2,
    margin: "auto",
    maxWidth: 1200,
    flexGrow: 1,
    display: "flex",
  },
  textStyle: {
    fontFamily: "Helvetica",
    fontsize: "16px",
    color: "#000000",
    fontWeight: "700",
  },
});

//home page layout this component
//we take various component we have created and create a layout
const Home = (props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Box sx={{ flexGrow: 1 }} p={4}>
        <Paper
          sx={{
            p: 2,

            maxWidth: "auto",
            flexGrow: 1,
            display: "flex",
          }}
        >
          <Grid item container spacing={2}>
            <Grid container item xs={12} sm={7}>
              <Grid item xs={12} sm={12}>
                <EIDCard />
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid container item xs={4} sm={4} align="center">
              <ButtonLayout />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Grid item container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h5" className={classes.textStyle}>
            Available Proofs
          </Typography>
          <Divider />
        </Grid>

        <Grid item sm={4}>
          <Identity />
        </Grid>

        <Grid item sm={4}>
          <PendingProofs />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
