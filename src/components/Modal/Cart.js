import Modal from "../Layout/Modal";

import classes from "./Cart.module.css";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const gridConfig = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  spacing: 0,
};

//style
const useStyles = makeStyles({
  buttonStyle: {
    color: "white",
    borderRadius: 14,
    background: "#2683AD",
    fontWeight: "bold",
    borderColor: "black",
  },
  iconStyle: {
    color: "#AB0014",
  },
  modalStyle: {
    color: "red",
    backgroundColor: "#DE3C51",
  },
});

//to show the correct items in the modal view to a specific VC
const Cart = (props) => {
  //here we get the specificVC data
  const [credentialDetails, seCredentialDetails] = useState(props.data);

  return (
    <>
      <Modal className={classes.modal}>
        <Box p={4}>
          <Grid container spacing={2}>
            <Box p={2}>
              <Grid container spacing={2} {...gridConfig}>
                <Grid item xs={12} sm={12}></Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="overline" gutterBottom component="div">
                    Issuer
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" fontWeight="bold">
                    {props.data.credentialSubject.data.hasCredential
                      ? //diplaying the issuer of the proof in the "new proof" componenet
                        props.data.credentialSubject.data.hasCredential
                          .recognizedBy.name
                      : props.data.credentialSubject.data.hasIDDocument
                          .hasIDDocument.issuer.name}
                  </Typography>
                  <br />
                </Grid>
                <br />
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item sm={5}>
                  <Typography variant="h6" gutterBottom component="div">
                    Certificate Information
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} />

                <br />
              </Grid>
              <Divider />
              <br />
              <Grid container>
                {props.data.credentialSubject.data.firstName && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="First Name"
                      value={credentialDetails.credentialSubject.data.firstName}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}

                {props.data.credentialSubject.data.lastName && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Last Name"
                      value={credentialDetails.credentialSubject.data.lastName}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.dateOfBirth && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Date Of Birth"
                      value={
                        credentialDetails.credentialSubject.data.dateOfBirth
                      }
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.educationalInstitution && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Educational Institution"
                      value={
                        props.data.credentialSubject.data.educationalInstitution
                      }
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.educationalLevel && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Educational Level"
                      value={props.data.credentialSubject.data.educationalLevel}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.matrikulationNr && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="MatrikulationNr"
                      value={props.data.credentialSubject.data.matrikulationNr}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.faculty && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Faculty"
                      value={props.data.credentialSubject.data.faculty}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.program && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Program"
                      value={props.data.credentialSubject.data.program}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}

                {props.data.credentialSubject.data.gender && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Gender"
                      value={props.data.credentialSubject.data.gender}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.nationality && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Nationality"
                      value={props.data.credentialSubject.data.nationality}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.idType && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Id Type"
                      value={props.data.credentialSubject.data.idType}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.registrationNr && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Registration Nr."
                      value={props.data.credentialSubject.data.registrationNr}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}

                {props.data.credentialSubject.data.streetAddress && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Street Address"
                      value={props.data.credentialSubject.data.streetAddress}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.city && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="City"
                      value={props.data.credentialSubject.data.city}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.region && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Region"
                      value={props.data.credentialSubject.data.region}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.postalCode && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Postal Code"
                      value={props.data.credentialSubject.data.postalCode}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.residencePermitCategory && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Residence Permit Category"
                      value={
                        props.data.credentialSubject.data
                          .residencePermitCategory
                      }
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.ahvNr && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="AHV Nr."
                      value={props.data.credentialSubject.data.ahvNr}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.bagNr && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Bag Nr."
                      value={props.data.credentialSubject.data.bagNr}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.insuranceNr && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Insurance Nr."
                      value={props.data.credentialSubject.data.insuranceNr}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.issuanceDate && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Issuance Date"
                      value={props.data.credentialSubject.issuanceDate}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
                {props.data.credentialSubject.data.expiryDate && (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      disabled
                      id="standard-read-only-input"
                      label="Expiry Date"
                      value={props.data.credentialSubject.data.expiryDate}
                      inputprops={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                )}
              </Grid>
              <br />
              <Grid container {...gridConfig}>
                <Grid>
                  <div className={classes.actions}>
                    <button
                      onClick={() => props.modalHandler()}
                      className={classes.button}
                    >
                      Close
                    </button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
