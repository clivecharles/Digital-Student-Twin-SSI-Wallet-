import { useState, React, useEffect } from "react";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import WorkIcon from "@mui/icons-material/Work";
import { makeStyles } from "@material-ui/styles";

//components
import { getallverifiablecredentials } from "../../../components/API/affinidiUserAPI";
import { generatedRequestToken } from "../../../components/API/affinidiAdminApi";

const info = {
  title: "Work Permit",
  description:
    "Use this form to send relevant credentials to the Office for Economy and Labor in order to receive a work permit",
};

const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

//style
const useStyles = makeStyles({
  buttonStyle: {
    p: 2,
    backgroundColor: "white",
    margin: "auto",
    minWidth: "150px",
    minHeight: "100px",
    flexGrow: 1,
    display: "flex",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "black",
  },
  iconStyle: {
    color: "#AB0014",
  },
  errorText: {
    color: "red",
  },
});

const ApplyWorkPermit = (props) => {
  //the required VCs for applying for work permit
  const requiredData = [
    "IDDocumentCredentialPersonV1",
    "EducationCredentialPersonV1",
  ];

  //list of credentials required
  const defaultList = [
    "Swiss E-id",
    "Residence Permit",
    "Certificate of Study",
  ];

  const [certificateOfStudy, setcertificateOfStudy] = useState("");
  const [residencePermit, setresidencePermit] = useState("");
  const [swissEid, setSwissEid] = useState("");

  //store the error messages
  const [proofList, setProofList] = useState(defaultList);

  const [dataReceived, setdataReceived] = useState(false);

  //Button state
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const data = {
    certificateOfstudy: certificateOfStudy,
    residencePermit: residencePermit,
  };

  //if the VC is present it is removed from the defaultlist this way we know which credentials are missing
  const handleRemoveItem = (proof) => {
    setProofList((proofList) => proofList.filter((item) => item !== proof));
  };

  useEffect(() => {
    let isMounted = true; // note mutable flag
    //get all the required VC and store them in data
    getallverifiablecredentials()
      .then((res) => {
        if (isMounted) {
          res.map((x) => {
            if (x.type.includes("EducationCredentialPersonV1")) {
              //if the credential is present it is removed from the default list
              handleRemoveItem("Certificate of Study");
              setcertificateOfStudy(x);
              setLoading(true);
            } else if (x.credentialSubject.data.residencePermitCategory) {
              setresidencePermit(x);
              handleRemoveItem("Residence Permit");
              setLoading(true);
            } else if (x.credentialSubject.data.registrationNr) {
              setSwissEid(x);
              handleRemoveItem("Swiss E-id");
              setLoading(true);
            } else {
              return;
            }
          });
        }
      })
      .then(() => {
        setdataReceived(true);
      });
    return () => {
      setLoading(true);

      isMounted = false;
    };
    // cleanup toggles value, if unmounted
  }, []);

  return (
    <Box pt={2}>
      <Paper
        sx={{
          p: 1,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Box p={1}>
          <Grid container spacing={2}>
            <Grid container item xs={12} sm={12}>
              <Typography variant="h6" fontWeight="bold">
                {info.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider />
              <br />
            </Grid>
          </Grid>
          <Grid container item sm={12} xs={12} spacing={2}>
            <Grid container item sm={2} xs={2} {...gridConfig}>
              <Grid item xs={12} sm={12}>
                <WorkIcon fontSize="large" />
              </Grid>
            </Grid>
            <Grid container item sm={4} xs={4}>
              <Grid item xs={12} sm={12}>
                <Typography fontWeight="bold">Info</Typography>
                <br />
                <Typography>{info.description}</Typography>
              </Grid>
            </Grid>

            <Grid container item sm={4} xs={4}>
              <Grid item xs={12} sm={12}>
                <Typography>Required VCs</Typography>
                <br />
                <Typography>* Swiss e-ID</Typography>
                <Typography>* Certifitcate of Study</Typography>
                <Typography>* Residence Permit</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              {...gridConfig}
              direction="column"
              item
              sm={2}
              xs={2}
            >
              <Grid item xs={12} sm={12}>
                <Button
                  disabled={proofList.length !== 0}
                  variant="contained"
                  component={Link}
                  to={{
                    pathname: "/shareCredential", //directs to the e-govt application form
                    state: {
                      ...data,
                      applicationType: "Apply Work Permit",
                    },
                  }}
                  // to generate the request token from the verifier requesting all the relevant vcs
                  onClick={() => generatedRequestToken(requiredData)}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item sm={12} xs={4}>
            {proofList.length !== 0 && ( //when the defaultlist still contains items it means the vc is not present and needs to be applied for
              <Typography variant="caption">
                The following items are missing form your Wallet{" "}
              </Typography>
            )}
            {dataReceived &&
              proofList.map((item) => {
                return (
                  <Grid item xs={12} sm={12}>
                    <Typography variant="caption" className={classes.errorText}>
                      {item}
                    </Typography>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default ApplyWorkPermit;
