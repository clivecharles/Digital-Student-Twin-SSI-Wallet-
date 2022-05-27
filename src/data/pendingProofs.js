import * as React from "react";
import { useState, useEffect } from "react";

//mui stuff
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";

//component
import NewProofs from "./newProofs";

//api call to get all proofs from the firestore database
import { getVC } from "../components/API/firebaseAPI";

//context
import { CredentialContext } from "../helper/credentialContext";

//style
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
  },
}));

const PendingProofs = (props) => {
  //state to check whether the proofs have been received
  const [dataReceived, setdataReceived] = useState(false);
  //statet to check if the proofs list is tempty
  const [notempty, setNotempty] = useState(false);

  // temporary data store for the proofs reiceived
  const [residencePermit, setResidencePermit] = useState("");
  const [certificateOfStudy, setCertificateOfStudy] = useState("");
  const [addressProof, setAddressProof] = useState("");
  const [insuranceProof, setInsuranceProof] = useState("");
  const [swissEid, setSwissEid] = useState("");

  //proofs
  const proofs = {
    certificateOfStudy: certificateOfStudy,
    residencePermit: residencePermit,
    addressProof: addressProof,
    insuranceProof: insuranceProof,
    swissEid: swissEid,
  };

  //to fetch all the proofs received stored in the firebase data store
  useEffect(() => {
    let isMounted = true;
    const didRaw = localStorage.getItem("DID");
    const fetchIdentities = async () => {
      const applications = await getVC().then((res) => {
        if (isMounted) {
          return res;
        }
      });

      const responseData = await applications;
      //get the induvidual applications from a student and store them respective states
      responseData.map((res) => {
        if (isMounted) {
          res.data.map((data) => {
            if (data.holder.id.includes(didRaw)) {
            }

            if (data.credentialSubject.data.hasIDDocument) {
              if (
                data.credentialSubject.data.hasIDDocument.hasIDDocument
                  .documentType === "Swiss E-id"
              ) {
                setSwissEid(data);
              }
            }
            if (data.credentialSubject.data.hasIDDocument) {
              if (
                data.credentialSubject.data.hasIDDocument.hasIDDocument
                  .documentType === "Residence Permit"
              ) {
                setResidencePermit(data);
              }
            }
            if (data.credentialSubject.data.matrikulationNr) {
              setCertificateOfStudy(data);
            }
            if (data.credentialSubject.data.streetAddress) {
              setAddressProof(data);
            }
            if (data.credentialSubject.data.ahvNr) {
              setInsuranceProof(data);
            }
          });
        }
      });
    };
    fetchIdentities()
      .then(() => {
        setdataReceived(true);
        //to check if the if there are any proofs if not the "no new proof" is shown
        Object.keys(proofs).map((data, i) => {
          if (proofs[data] !== " ") {
            setNotempty(true);
          }
        });
      })
      .catch((error) => {
        console.log("Info", error);
      });
    return () => {
      //    setLoading(true);
      isMounted = false;
    };
  }, []);

  const classes = useStyles();

  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "#cee0f4",
      }}
    >
      <Box p={2}>
        <Grid item sm={12} xs={12}>
          <Typography variant="h6" fontWeight="bold">
            New Proofs
          </Typography>
          <Divider />
          <br />
        </Grid>
        {!notempty && ( //when no new proofs are present
          <Box pl={10}>
            <Typography className={classes.text}>No new proofs</Typography>
          </Box>
        )}
        {dataReceived && ( //new proofs are shown only when the api call is finished data received is true
          <>
            {Object.keys(proofs).map((data, i) => {
              if (proofs[data] !== "") {
                return <NewProofs key={i} data={proofs[data]} />;
              }
            })}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PendingProofs;
