import * as React from "react";
import { useState, useRef } from "react";

//material ui components used to design the front-end
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@mui/material";

//Componets
import EIDCard from "../../../components/Identities/eIDcard";
import RequiredCredentials from "./requiredCredentials";

//function to get the selected credentials from wallet 
import { getSelectedCredentialsFromWallet } from "./ApplyCredentials/SetCredentialsToBeShared";

//function to store the response token 
import { responseToken } from "../shareCredential/ApplyCredentials/DataTransformation/shareResponseToken";


import history from "../../../history";

//api calls
import { storeResponseToken } from "../../../components/API/firebaseAPI";
import { getIdInfo } from "../../../components/API/affinidiUserAPI";

//firbase storage functions
import { storage } from "../../../firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

//style
const useStyles = makeStyles({
  buttonStyle: {
    padding: "10px",
    backgroundColor: "white",
    margin: "auto",
    minWidth: "150px",
    minHeight: "100px",
    flexGrow: 1,
    display: "flex",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "white",
    boxShadow: "10px 10px 10px -5px rgba(0,0,0,0.4)",
  },
  iconStyle: {
    color: "#AB0014",
  },
  text1: {
    fontWeight: "bold",
  },
});

//Main form layout for an e-government application 
const MainFormLayout = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //to store the image url
  const [imgUrl, setImgUrl] = useState([]);

  //here all the attributes selected from the students are stored
  const [credentials, setCredentials] = useState([{}]);

  //here we receive the required credentials to be shared 
  const { state } = props.location;

  //relevant credentials passed for an e-govt service
  const requiredCredentials = state;


  //used to set a timer until the api calls are done 
  const timer = useRef();


  //loading button at the time of making api calls 
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        history.push("/confirmation");
        window.location.reload();
        return false;
      }, 12000);
    }
  };

  //button success style 
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  //to add the selected attributes in credential array to be later fetched from the cloud wallet 
  const addSelectedCredentials = (creds) => {
    if (creds.streetAddress) {
      setCredentials((prevState) => ({ ...prevState, addressProof: creds }));
    }
    if (creds.matrikulationNr) {
      setCredentials((prevState) => ({
        ...prevState,
        certificateOfStudy: creds,
      }));
    }
    if (creds.residencePermitCategory) {
      setCredentials((prevState) => ({
        ...prevState,
        residencePermit: creds,
      }));
    }
  };

  //api call to store the response token in firestore datavase 
  const storeToken = (responseToken, applicantType, imgUrl) => {
    storeResponseToken(responseToken, applicantType, imgUrl).then(() => {});
  };

  //here we submit the final e-government application to the firestore database 
  async function handleFinalSubmit() {
    handleButtonClick();//loading button start 
    //get the attributes from the claimerID of swiss e-ID VC to be then able to pass its credentials
    const identityProofClaimId = await getIdInfo().then((res) => {
      return res.claimId;
    });

    //here we get all the VCs with the selected attributes stored in credentials 
    const data = await getSelectedCredentialsFromWallet(
      credentials,
      identityProofClaimId,
      true
    ).then((res) => {
      res = res.filter(function (element) {//to remove any empty elements 
        return element !== undefined;
      });  
      return res;
    });

    const response = await responseToken(data);

    //function call to  store the respone token in firebase 
    storeToken(response, state.applicationType, imgUrl);
  }


  //upload image function to firestore database 
  const uploadHandler = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    //send to server
    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progess
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl((prev) => [...prev, url]);
          console.log(url);
        });
      }
    );
  };

  return (
    <Paper
      sm={{ p: 2, margin: "auto", minWidth: 500, flexGrow: 1, display: "flex" }}
    >
      <Box p={3} sx={{ flexGrow: 2 }}>
        <Grid item container spacing={2}>
          <Grid item container sm={12} spacing={2}>
            <Grid item sm={7} xs={8}>
              <Grid item sm={12}>
                <Typography variant="h5" fontWeight="bold">
                  {state.applicationType}
                </Typography>
              </Grid>
              <Divider />
              <br />
              <Grid item sm={12}>
                <Typography variant="h6" fontWeight="bold">
                  Your e-ID
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="caption">
                  *Required in order to prove your identity to the Verifier
                </Typography>
              </Grid>
              <EIDCard />
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h6" fontWeight="bold">
                Required Credentials
              </Typography>

              <Typography variant="caption">
                <Divider />
                {
                  " *Please select the required attributes from your Verifiable credentials for further processing your application. The required attributes are marked in red"
                }
              </Typography>
              <Typography variant="caption" className={classes.text1}>
                <br />
                {
                  " After selecting the attributes from the proof click on apply "
                }
              </Typography>
              <br />
            </Grid>
          </Grid>
          <Grid container item sm={12} direction="row" spacing={0}>
            <RequiredCredentials
              data={requiredCredentials}
              share={addSelectedCredentials}
            />
          </Grid>
          <Grid container item>
            <Grid item sm={12}>
              <Typography variant="h6" fontWeight="bold">
                Additional documents
              </Typography>
              <Divider />
              <Typography variant="caption">
                {
                  " *Please select the required documents (*) for further processing of your application"
                }
              </Typography>
              <br />
            </Grid>

            <Grid item sm={12}>
              <label>*Passport</label>
            </Grid>
            <input type="file" id="imageInput" onChange={uploadHandler}></input>

            {state.applicationType === "Renew Residence Permit" && (//depending on the application type differemt documents have to be uploaded
              <>
                <Grid item sm={12}>
                  <label>*Visa</label>
                </Grid>
                <input
                  type="file"
                  id="imageInput"
                  onChange={uploadHandler}
                ></input>
              </>
            )}
            {state.applicationType === "Renew Residence Permit" && (
              <>
                <Grid item sm={12}>
                  <label>*Bank Statements</label>
                </Grid>
                <input
                  type="file"
                  id="imageInput"
                  onChange={uploadHandler}
                ></input>
              </>
            )}
            {state.applicationType === "Apply Work Permit" && (
              <>
                <Grid item sm={12}>
                  <label>*Work Contract</label>
                </Grid>
                <input
                  type="file"
                  id="imageInput"
                  onChange={uploadHandler}
                ></input>
              </>
            )}
            {state.applicationType === "Apply Work Permit" && (
              <>
                <Grid item sm={12}>
                  <label>Personal Resume</label>
                </Grid>
                <input
                  type="file"
                  id="imageInput"
                  onChange={uploadHandler}
                ></input>
              </>
            )}
            <Grid item sm={4} />
            <Grid item sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    disabled={!credentials || loading}
                    variant="contained"
                    sx={buttonSx}
                    //handle the final submit of the application 
                    onClick={() => handleFinalSubmit()}
                  >
                    Confirm and Share Credentials
                  </Button>
                  {loading && (//loading button 
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
      </Box>
    </Paper>
  );
};

export default MainFormLayout;
