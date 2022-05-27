import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

//data properties of the eid if the stundet decides to apply for an eid
const data = {
  //chekc the paper to see what detaisl are required
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  idType: "",
  gender: "",
};

//style
const useStyles = makeStyles({
  buttonStyle: {
    color: "white",
    borderRadius: 16,
    background: "#ab0014",
    fontWeight: "bold",
  },

  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ab0014",
  },
  text2: {
    fontWeight: "bold",
  },
  titelStyle: {
    color: "#2683AD",
    fontWeight: "bold",
  },
});

//this is displayed when the e-id has not been applied yet and gives the user the opportunity to apply for the swiss e-id
const EidPlaceHolder = () => {
  const classes = useStyles();
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 600,
        flexGrow: 1,
        display: "flex",
      }}
      elevation={5}
    >
      <Grid container item spacing={0} xs={12}>
        <Box p={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" className={classes.title}>
              Swiss E-ID
            </Typography>
          </Grid>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Box p={2}>
                <Divider />
                <br />
                <Grid item sm={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    The Swiss e-ID allows you to prove your identity online
                    removing your physical presence when applying for a service
                    in Switzerland. This digital identity will not controlled by
                    any centralized authority.
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    className={classes.text2}
                  >
                    Apply for the Swiss e-ID before you add other credentials to
                    your wallet otherwise you will not be able to prove your
                    identity to the issuer .
                  </Typography>
                </Grid>
                <Box pt={2}>
                  <Grid item>
                    <Button
                      className={classes.buttonStyle}
                      variant="contained"
                      component={Link}
                      to={{
                        pathname: "/createVC", //redirects to the swiss e-id application form
                        state: data,
                      }}
                    >
                      Apply Now
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EidPlaceHolder;
