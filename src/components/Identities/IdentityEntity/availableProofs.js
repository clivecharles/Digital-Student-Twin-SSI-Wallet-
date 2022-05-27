import React, { useState } from "react";

//MUI stuff
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

//styles
import { makeStyles } from "@material-ui/styles";

//icon from material ui
import HomeIcon from "@mui/icons-material/Home";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import BadgeIcon from "@mui/icons-material/Badge";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

//styles
const useStyles = makeStyles({
  buttonStyle: {
    color: "white",
    borderRadius: 14,
    background: "#2683AD",
    fontWeight: "bold",
    borderColor: "black",
  },
  deleteButtonStyle: {
    color: "white",
    borderRadius: 14,
    background: "#e05853",
    fontWeight: "bold",
    borderColor: "black",
  },
  cardStyle: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 20,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
  titelStyle: {
    color: "#2683AD",
    fontWeight: "bold",
  },
  iconStyle: {
    fontSize: 50,
    alignContent: "center",
  },
});

const AvailableProofs = (props) => {
  const classes = useStyles();

  var school = false;
  var home = false;
  var identity = false;
  var insurance = false;

  //here we get the proofs data passed from the identity component
  const data = props.proof;

  // here we further exrtact the data object
  const certificateCredential = data.credentialSubject.data;

  var attribute = [];

  //this block of code extracts some attributes from the proofs in order to display them on the card
  if (certificateCredential.city) {
    attribute.push("City", certificateCredential.city);
    home = true;
  } else if (certificateCredential.matrikulationNr) {
    attribute.push("Mtk Nr", data.credentialSubject.data.matrikulationNr);
    school = true;
  } else if (certificateCredential.insuranceNr) {
    insurance = true;
    attribute.push("Insur Nr", data.credentialSubject.data.insuranceNr);
  } else if (
    certificateCredential.hasIDDocument.hasIDDocument.documentType ===
    "Swiss E-id"
  ) {
    identity = true;
    attribute.push("Type", certificateCredential.idType);
  } else if (
    certificateCredential.hasIDDocument.hasIDDocument.documentType ===
    "Residence Permit"
  ) {
    home = true;
    attribute.push("Type", certificateCredential.idType);
  } else {
    return;
  }

  //the card to display a proof on the home screen
  return (
    <Box p={1}>
      <Card className={classes.card}>
        <CardContent className={classes.cardStyle}>
          <Grid item container>
            <Grid item xs={2} sm={2} />
            <Grid item xs={9} sm={9}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.titelStyle}
              >
                {certificateCredential.hasCredential // the credential type can be stored in two different places in the object hence this is neccesary to differenciate
                  ? certificateCredential.hasCredential.recognizedBy.docType
                  : certificateCredential.hasIDDocument.hasIDDocument
                      .documentType}
              </Typography>
              <br />
            </Grid>
            <Grid item container xs={3} sm={3}>
              <Grid item xs={12} sm={12}>
                {home && (
                  <HomeIcon className={classes.iconStyle} fontSize="large" />
                )}
                {school && (
                  <SchoolRoundedIcon
                    className={classes.iconStyle}
                    fontSize="large"
                  />
                )}
                {identity && (
                  <BadgeIcon className={classes.iconStyle} fontSize="large" />
                )}
                {insurance && (
                  <HealthAndSafetyIcon
                    className={classes.iconStyle}
                    fontSize="large"
                  />
                )}
              </Grid>
            </Grid>
            <Grid item container xs={9} sm={9}>
              <Grid item xs={4} sm={4}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  className={classes.text1}
                >
                  From:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography
                  gutterBottom
                  variant="body1"
                  className={classes.text2}
                >
                  {certificateCredential.hasCredential /// the issuer name can be stored in two different places in the object hence this is neccesary to differenciate
                    ? certificateCredential.hasCredential.recognizedBy.name
                    : certificateCredential.hasIDDocument.hasIDDocument.issuer
                        .name}
                </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  className={classes.text1}
                >
                  {attribute[0]}:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography gutterBottom variant="body1" component="div">
                  {attribute[1]}
                </Typography>
                <br />
              </Grid>
            </Grid>
            <Grid item xs={2} sm={2} />
            <Grid item xs={5} md={5}>
              <Button
                className={classes.buttonStyle}
                onClick={() =>
                  //to open the proof with the correct details in the modal
                  props.modalHandler(props.proof.id, props.proof)
                }
              >
                Show Details
              </Button>
            </Grid>
            <Grid item xs={1} sm={1} />
            <Grid item xs={5} md={4}>
              <Button
                className={classes.deleteButtonStyle}
                onClick={
                  // to delete a given proof  using the claimerId which is referenced inside the proof
                  () => props.deleteCredential(props.proof.id)
                }
              >
                REMOVE
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AvailableProofs;
