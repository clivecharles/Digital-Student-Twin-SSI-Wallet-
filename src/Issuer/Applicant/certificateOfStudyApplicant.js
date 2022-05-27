import * as React from "react";
import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

//Component
import { BuildAndSign } from "../BuildAndSign/buildAndSignCredential";
import history from "../../history";

//API call to store the Verifiable credential in firestore
import { postVC } from "../../components/API/firebaseAPI";
//API call to delete the pending application
import { deleteApplication } from "../../components/API/firebaseAPI";

const CertificiateOfStudyApplicant = (props) => {
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

  //starts the approval and sign process
  const handleClick = () => {
    handleButtonClick();
    //function call to build and sign the credentials
    BuildAndSign(props.data)
      .then((res) => {
        //store VC in firestore
        postVC(res).then(() => {});
      })
      .then(() => {
        //delete the pending application
        deleteApplication(props.data.did, props.data.applicationType);
      }) // to catch any errors
      .catch((err) => {});
  };

  return (
    <Grid container item xs={6} sm={12}>
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
              //link to verify the token
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
          placeholder="Reponse Token"
          defaultValue={props.data.tok}
          style={{ width: 700 }}
        />
      </Grid>

      <Grid item sm={12}>
        <br />
        <Typography variant="h6" fontWeight="bold">
          Student Claims
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
          label="Last name"
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
          label="Educational Institution"
          defaultValue={props.data.educationalInstitution}
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
          label="Semester Period"
          defaultValue={props.data.semesterPeriod}
          inputprops={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-read-only-input"
          label="Matrikulation Number"
          defaultValue={props.data.matrikulationNr}
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
          label="Education Level"
          defaultValue={props.data.educationalLevel}
          inputprops={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-read-only-input"
          label="Faculty"
          defaultValue={props.data.faculty}
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
          label="Programm"
          defaultValue={props.data.program}
          inputprops={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-read-only-input"
          label="Expiry Date"
          defaultValue={props.data.expiryDate}
          inputprops={{
            readOnly: true,
          }}
          variant="standard"
        />
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

export default CertificiateOfStudyApplicant;
