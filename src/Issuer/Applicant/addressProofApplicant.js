import * as React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
//material UI comopnets to design the front end
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import TextareaAutosize from "@mui/material/TextareaAutosize";
//react component to redirect to other pages

//Component to build and sign credentials
import { BuildAndSign } from "../BuildAndSign/buildAndSignCredential";

//history
import history from "../../history";

//API call to store the Verifiable credential in firestore
import { postVC } from "../../components/API/firebaseAPI";
//API call to delete the pending application
import { deleteApplication } from "../../components/API/firebaseAPI";

const AddressProofApplicant = (props) => {
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
      .catch((err) => {});
  }

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

      <Grid item container sm={6}>
        <Grid item sm={12}>
          <br />
          <Typography variant="h6" fontWeight="bold">
            Address Claim Details
          </Typography>
          <br />
        </Grid>
        <Grid item sm={6}>
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
        <Grid item sm={6}>
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
            label="Street Address"
            defaultValue={props.data.streetAddress}
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
            label="City"
            defaultValue={props.data.city}
            inputprops={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-read-only-input"
            label="Region"
            defaultValue={props.data.region}
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
            label="Postal Code"
            defaultValue={props.data.postalCode}
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

              {loading && ( //button loading until the api calls are done
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
/** <Grid item xs={12}>
                          <Button>Next</Button>
                        </Grid> */
export default AddressProofApplicant;
