import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

//api call to delete the response token when verified
import { deleteResponseToken } from "../components/API/firebaseAPI";

//random id generator
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

//styles
const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: "#e05853",
    fontWeight: "bold",
  },
  viewButton: {
    fontWeight: "bold",
  },
}));

//
const ReceivedResponseToken = (props) => {
  const [data, setdata] = useState(props);
  const classes = useStyles();

  var heading;

  //describing the heading depending on the application received
  if (props.data.applicationType === "Renew Residence Permit") {
    heading = " Residence permit renewal application";
  }
  if (props.data.applicationType === "Apply Work Permit") {
    heading = "Work Permit Application";
  }

  //this handles the delete checking the application type and the response token
  const handelButtonDelete = () => {
    deleteResponseToken(
      data.data.applicationType,
      data.data.responseToken
    ).then(() => {
      window.location.reload();
    });
  };

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

            <Grid item sm={2} xs={2}>
              <Box pt={2}>
                <Button
                  variant="contained"
                  component={Link}
                  className={classes.viewButton}
                  to={{
                    pathname: "/responseDetails",
                    state: data,
                  }}
                >
                  View More
                </Button>
              </Box>
            </Grid>
            <Grid item sm={2} xs={2}>
              <Box pt={2}>
                <Button
                  variant="contained"
                  className={classes.deleteButton}
                  onClick={() => handelButtonDelete()} //when clicked handelButtondelete is called
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReceivedResponseToken;
