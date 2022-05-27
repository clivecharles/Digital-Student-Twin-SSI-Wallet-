import { useState, React, useEffect } from "react";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";

import HomeIcon from "@mui/icons-material/Home";

//components
import { getallverifiablecredentials } from "../../../components/API/affinidiUserAPI";
import RequiredCredentials from "../../Forms/shareCredential/requiredCredentials";
import { generatedRequestToken } from "../../../components/API/affinidiAdminApi";

const info = {
  title: "Renew Residence Permit",
  description:
    "If your residence permit is expiring soon you can apply for a new one ",
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

const RenewResidencePermit = (props) => {
  //the required VCs for applying for residence permit
  const requiredData = [
    "IDDocumentCredentialPersonV1",
    "EducationCredentialPersonV1",
    "AddressCredentialPersonV1",
    "IDDocumentCredentialPersonV1",
  ];

  //list of credentials required
  const defaultList = [
    "Swiss E-id",
    "Residence Permit",
    "Certificate of Study",
    "Address Proof",
  ];

  const [certificateOfStudy, setcertificateOfStudy] = useState("");

  const [swissEid, setSwissEid] = useState("");
  const [residencePermit, setresidencePermit] = useState("");
  const [addressProof, setAddressProof] = useState("");

  //store the error messages
  const [proofList, setProofList] = useState(defaultList);

  const [dataReceived, setdataReceived] = useState(false);

  //Button state
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  const data = {
    certificateOfstudy: certificateOfStudy,
    residencePermit: residencePermit,
    addressProof: addressProof,
  };

  //if the VC is present it is removed from the defaultlist this way we know which credentials are missing
  const handleRemoveItem = (proof) => {
    setProofList((proofList) => proofList.filter((item) => item !== proof));
  };

  useEffect(() => {
    let isMounted = true; // note mutable flag
    getallverifiablecredentials()
      .then((res) => {
        if (isMounted) {
          res.map((x) => {
            //get all the required VC and store them in data
            if (x.type.includes("EducationCredentialPersonV1")) {
              handleRemoveItem("Certificate of Study");
              setcertificateOfStudy(x);
              setLoading(true);
            } else if (x.type.includes("AddressCredentialPersonV1")) {
              handleRemoveItem("Address Proof");
              setAddressProof(x);
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
                <HomeIcon fontSize="large" />
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
                <Typography>* Swiss E-Id </Typography>
                <Typography>* Certifitcate of Study</Typography>
                <Typography>* Residence Permit</Typography>
                <Typography>* Address Proof</Typography>
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
                      applicationType: "Renew Residence Permit",
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
            {proofList.length !== 0 && (
              <Typography variant="caption">
                The following items are missing form your Wallet{" "}
              </Typography>
            )}
            {dataReceived &&
              proofList.map((item) => {
                return (
                  //when the defaultlist still contains items it means the vc is not present and needs to be applied for
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

export default RenewResidencePermit;
