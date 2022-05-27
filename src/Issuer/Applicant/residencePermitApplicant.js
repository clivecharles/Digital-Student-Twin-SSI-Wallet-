import * as React from "react";
import { useState, useRef } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";

//Component to build and sign credentials
import { BuildAndSign } from "../BuildAndSign/buildAndSignCredential";

//API call to store the Verifiable credential in firestore
import { postVC } from "../../components/API/firebaseAPI";
//API call to delete the pending application
import { deleteApplication } from "../../components/API/firebaseAPI";

//history
import history from "../../history";

const ResidencePermitApplicant = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const timer = useRef();

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
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleClick = () => {
    handleButtonClick();
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
  };

  return (
    <Grid item container xs={6} sm={12}>
      <Grid item sm={12}>
        <Typography variant="h6" fontWeight="bold">
          Verify identity
        </Typography>
        <br />
      </Grid>
      <Grid item sm={12}>
        <small>
          <Typography variant="h" fontWeight="bold">
            Copy the response Token and veriify identity{" "}
          </Typography>
          <Link
            to={{
              pathname: "https://verifier-token.vc-generator.com/",
            }}
            target="_blank"
          >
            click here
          </Link>
        </small>

        <br />
      </Grid>
      <Grid item sm={12}>
        <TextareaAutosize
          maxRows={10}
          aria-label="maximum height"
          placeholder="Reponse token"
          defaultValue={props.data.tok}
          style={{ width: 700 }}
        />
      </Grid>

      <Grid item container sm={6}>
        <Grid item sm={12}>
          <br />
          <Typography variant="h6" fontWeight="bold">
            Residence Permit Claim Details
          </Typography>
          <br />
        </Grid>
        <Grid item sm={6}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="First name"
            defaultValue={props.data.firstName}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Last name"
            defaultValue={props.data.lastName}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Date of birth"
            defaultValue={props.data.dateOfBirth}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Birth place"
            defaultValue={props.data.birthPlace}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>

        <Grid item sm={6}>
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
        <Grid item sm={6}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Date of entry"
            defaultValue={props.data.dateOfEntry}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Residence permit category"
            defaultValue={props.data.residencePermitCategory}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Expiry date"
            defaultValue={props.data.expiryDate}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Issue date"
            defaultValue={props.data.issueDate}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            disabled
            id="standard-read-only-input"
            label="Remark"
            defaultValue={props.data.remark}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid container item sm={6} xs={6}>
          <Grid item sm={12} xs={12}>
            <br />
            <br />
            <Typography variant="h6" fontWeight="bold">
              Provided Document
            </Typography>
            <Divider />
          </Grid>
          <Grid item sm={12}>
            <br />
            <img src={props.data.imgUrl} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item>
        <Grid item sm={5} />
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
              {loading && ( //circular loading symbole until api class are done
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

export default ResidencePermitApplicant;
