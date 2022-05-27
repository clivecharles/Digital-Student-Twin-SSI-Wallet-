import { useState, useEffect } from "react";
import * as React from "react";

//material ui
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { makeStyles } from "@material-ui/styles";

//icon from material ui
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

//place holder image
import AppIcon from "../../Images/federer.jpg";

//component
import EidPlaceHolder from "./EidPlaceHolder";

//api call to cloud wallet to get all verfiable credentials
import { getallverifiablecredentials } from "../API/affinidiUserAPI";

//style the image
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

//style
const useStyles = makeStyles({
  iconStyle: {
    color: "#91ff91",
  },
});

const EIDCard = () => {
  const classes = useStyles();
  const [eid, setEid] = useState(""); //state holding the eid proof
  const [loading, setLoading] = useState(false); //loading state

  //here we fetch the eid verfiable credential from the wallet
  useEffect(() => {
    let isMounted = true; // note mutable flag
    getallverifiablecredentials()
      .then((res) => {
        if (isMounted) {
          res.map((proof) => {
            if (
              proof.credentialSubject.data.hasIDDocument &&
              proof.credentialSubject.data.hasIDDocument.hasIDDocument
                .documentType === "Swiss E-id"
            ) {
              setEid(proof);
              setLoading(true);
            }
          });
        }
      })
      .catch((err) => {
        console.log("Info", err);
      });
    return () => {
      //    setLoading(true);
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);

  return (
    // if the eid is not present a place holder will be shown
    <>
      {!loading && <EidPlaceHolder />}
      {eid && ( // here the actual eid is shown
        <Paper
          sx={{
            p: 2,
            maxWidth: 600,
            flexGrow: 1,
            display: "flex",
            color: "white",
            backgroundColor: "#ab0014",
            borderRadius: "4",
          }}
          elevation={5}
        >
          <Grid item container spacing={0} xs={12}>
            <Grid item xs={4} sm={5}>
              <Typography variant="h6" gutterBottom>
                Swiss e-ID
              </Typography>
            </Grid>
            <Grid item sm={2} />
            <Grid item xs={4} sm={5}>
              <Typography variant="h6" gutterBottom>
                Status: Verified
                <VerifiedUserIcon className={classes.iconStyle} />
              </Typography>

              <br />
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={2} sm={3}>
                <ButtonBase
                  xs={{ width: 60, height: 60 }}
                  sm={{ width: 100, height: 100 }}
                >
                  <Img alt="complex" src={AppIcon} />
                </ButtonBase>
              </Grid>
              <Grid item xs={10} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs={5}>
                    <Typography gutterBottom variant="caption" component="div">
                      First name
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {eid.credentialSubject.data.firstName}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      Last name
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {eid.credentialSubject.data.lastName}
                    </Typography>
                    <Typography variant="body2">
                      RegNr: {eid.credentialSubject.data.registrationNr}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2"></Typography>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Typography gutterBottom variant="caption" component="div">
                    Date of birth
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {eid.credentialSubject.data.dateOfBirth}
                  </Typography>
                  <Typography gutterBottom variant="caption" component="div">
                    Valid through
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {eid.credentialSubject.data.expiryDate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default EIDCard;
