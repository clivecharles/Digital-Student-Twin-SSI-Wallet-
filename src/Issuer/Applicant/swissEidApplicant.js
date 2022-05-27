import * as React from "react";
import { useState, useRef } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

//Component to build and sign credentials
import { BuildAndSign } from "../BuildAndSign/buildAndSignCredential";

//API call to store the Verifiable credential in firestore
import { postVC } from "../../components/API/firebaseAPI";
//API call to delete the pending application
import { deleteApplication } from "../../components/API/firebaseAPI";

//history
import history from "../../history";

const SwissEidApplicant = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const timer = useRef();

  //loading button until the api calls are done
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        history.push("/issuerHome");
        window.location.reload();
        return false;
      }, 10000);
    }
  };
  //button hover style
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  //starts the approval and sign process
  async function handleClick() {
    handleButtonClick();
    //function call to build and sign the credentials
    BuildAndSign(props.data)
      .then((res) => {
        //store VC in firestore
        postVC(res);
      })
      .then(() => {
        //delete the pending application
        deleteApplication(props.data.did, props.data.applicationType);
      }) // to catch any errors
      .catch((err) => {
        console.log("info", err);
      });
  }
  return (
    <Grid container item xs={12} sm={12}>
      <Grid item container sm={6}>
        <Grid item sm={12}>
          <Typography variant="h6" fontWeight="bold">
            Personal Details
          </Typography>
          <br />
        </Grid>
        <Grid item sm={12}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="First Name"
            defaultValue={props.data.firstName}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />

          <TextField
            disabled
            id="standard-read-only-input"
            label="Last Name"
            defaultValue={props.data.lastName}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Date Of Birth"
            defaultValue={props.data.dateOfBirth}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Nationality"
            defaultValue={props.data.nationality}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Gender"
            defaultValue={props.data.gender}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid container item sm={12} xs={12}>
          <Grid item sm={12} xs={12}>
            <br />
            <br />
            <Typography variant="h6" fontWeight="bold">
              Provided Document
            </Typography>
            <Divider />
          </Grid>
          <Grid item sm={6}>
            <ButtonBase sm={{ width: 50, height: 50 }}>
              <Img alt="complex" src={props.data.imgUrl} />
            </ButtonBase>
            <br />
            {/** <img src={props.data.imgUrl} />*/}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item sm={8} />
        <Grid item sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={() => handleClick()}
              >
                Approve and Sign
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
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
    </Grid>
  );
};

export default SwissEidApplicant;
