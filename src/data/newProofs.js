import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import BadgeIcon from "@mui/icons-material/Badge";
import { makeStyles } from "@material-ui/styles";

//components
import { StoreVerifiableData } from "../components/API/affinidiUserAPI";
import { deleteVC } from "../components/API/firebaseAPI";

//style
const useStyles = makeStyles({
  buttonStyle: {
    color: "white",
    borderRadius: 10,
    background: "#2683AD",
    fontWeight: "bold",
    borderColor: "black",
  },
  titelStyle: {
    color: "#2683AD",
    fontWeight: "bold",
  },
  iconStyle: {
    fontSize: 50,
    alignContent: "center",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

const NewProofs = (props) => {
  const classes = useStyles();
  const data = props.data.credentialSubject.data;

  //to store the given proof in the wallet
  const handleClick = () => {
    StoreVerifiableData(props.data).then(() => {
      //  to remove the pending proof from the list when stored in wallet
      deleteVC(props.data.id).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <Box pt={1}>
      <Paper>
        <Box p={2}>
          <Grid item container spacing={1}>
            <Grid item container sm={2.5}>
              <Box p={2}>
                <Grid item xs={12} sm={12}>
                  <ButtonBase
                    xs={{ width: 60, height: 60 }}
                    sm={{ width: 100, height: 100 }}
                  >
                    <BadgeIcon />
                  </ButtonBase>
                </Grid>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Grid item sm={12}>
                <Grid item>
                  <Typography
                    className={classes.text1}
                    variant="overline"
                    fontWeight="bold"
                  >
                    {data.hasCredential
                      ? //diplaying the type of proof received in the "new proof" component
                        data.hasCredential.recognizedBy.docType
                      : data.hasIDDocument.hasIDDocument.documentType}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="overline" fontWeight="bold">
                    Issuer:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="overline" fontWeight="bold">
                    {data.hasCredential
                      ? //diplaying the issuer of the proof in the "new proof" componenet
                        data.hasCredential.recognizedBy.name
                      : data.hasIDDocument.hasIDDocument.issuer.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3}>
              <br />
              <Grid item xs={12} sm={12}>
                <ButtonBase
                  xs={{ width: 60, height: 60 }}
                  sm={{ width: 100, height: 100 }}
                >
                  <Button
                    className={classes.buttonStyle}
                    //calls the function to add proof to the student wallet
                    onClick={() => handleClick()}
                  >
                    Add to wallet
                  </Button>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewProofs;
