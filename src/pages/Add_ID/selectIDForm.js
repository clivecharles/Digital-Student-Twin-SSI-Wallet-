import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//credential components
import CertificateOfStudy from "./IdType/certificateOfStudy";
import AddressProof from "./IdType/addressProof";
import SwissEid from "./IdType/swissEid";
import ResidencePermit from "./IdType/residencePermit";
import InsuranceProof from "./IdType/insuranceProof";

//api
import { getIdInfo } from "../../components/API/affinidiUserAPI";

//style
const useStyles = makeStyles({
  buttonStyle: {
    color: "white",
    borderRadius: 14,
    background: "#2683AD",
    fontWeight: "bold",
    borderColor: "black",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
  titelStyle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  iconStyle: {
    fontSize: 22,
    alignContent: "center",
    color: "grey",
  },
});

const SelectIdForm = (props) => {
  //state which tell if the data was received
  const [dataReceived, setdataReceived] = useState(false);

  //to store initial attributes once a an id has been approved such as the swiss e-id
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  //data store
  const data = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
  };

  // to get the data such as name ,last name and date of birth from the cloud storage if the swiss e-id credential is present
  useEffect(() => {
    let isMounted = true;
    const fetchIdentities = async () => {
      const applications = await getIdInfo().then((res) => {
        // api call to the cloud wallet to fetch the credential attributes
        if (isMounted) {
          return res;
        }
      });
      const responseData = await applications;

      //to set the credentials when present to avoid renter of same inforamation
      setFirstName(responseData.firstName);
      setLastName(responseData.lastName);
      setDateOfBirth(responseData.dateOfBirth);
    };
    fetchIdentities()
      .then(() => {
        setdataReceived(true); //when the data is received the state is set to true to indicate
      })
      .catch((error) => {
        console.log("info", error);
      });
    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);

  const classes = useStyles();
  return (
    <Box sm={{ flexGrow: 1 }}>
      <Grid container spacing={4} justifyContent="center">
        <Box pt={10} pl={5}>
          <Grid item xs={5} sm={5}>
            <Typography className={classes.titelStyle}>
              Apply for a Verifiable Credential
              <IconButton component={Link} to={{ pathname: "/Information" }}>
                <InfoIcon className={classes.iconStyle} />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={5} sm={5}></Grid>
          <Divider />
          <br />
          <Grid item xs={12} md={12}>
            <Typography className={classes.text2}>
              Select a physical proof or certificate you already have in your
              possession to transform it into a digital proof which you can add
              to your the wallet
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        {data.firstName && ( //only after the data is received these components are loaded with initial data if swiss e-id has been applied for
          <>
            <Grid item xs={12} md={12}>
              <AddressProof data={data} />
            </Grid>
            <Grid item xs={12} md={12}>
              <InsuranceProof data={data} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CertificateOfStudy data={data} />
            </Grid>
            <Grid item xs={12} md={12}>
              <SwissEid />
            </Grid>
            <Grid item xs={12} md={12}>
              <ResidencePermit data={data} />
            </Grid>
          </>
        )}
        {!data.firstName && ( //only after the data is received these components are loaded with initial data if swiss e-id has been applied for
          <>
            <Box p={20}>
              <Typography variant="h4">
                {" "}
                You need to apply for a Swiss e-ID first before you can apply
                for verifiable credentials.
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SelectIdForm;
