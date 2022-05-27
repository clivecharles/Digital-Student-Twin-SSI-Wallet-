import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { makeStyles } from "@material-ui/styles";

//styles
const useStyles = makeStyles({
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
    fontSize: 24,
  },
});

//the info page containing relevant information about the SSI concept
const InfoPage = () => {
  const classes = useStyles();
  //here we get the DID of the student which is stored in the local storage of the browser at the time the user logs in
  const didRaw = localStorage.getItem("DID");

  return (
    <Box sx={{ flexGrow: 1 }} p={10}>
      <Paper>
        <Box p={5}>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography className={classes.titelStyle}>Your DID</Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Box p={2}>
                <Paper elevation={5}>
                  <Box p={2}>
                    <TextareaAutosize
                      disabled
                      maxRows={20}
                      aria-label="maximum height"
                      placeholder="Maximum 4 rows"
                      defaultValue={didRaw}
                      style={{ width: 600 }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text1}>
                What is an SSI ?
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text2}>
                Self-sovereign identities (SSI) are digital identities that are
                managed in a decentralized manner. This is technology allows you
                to own your own identity and to control how your personal data
                is shared and used without depending on third-party providers to
                store and centrally manage the data.
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text1}>
                What is a Decentralized Identifer {"(DID)"} ?
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text2}>
                DID is a type of identifier that enables a verifiable,
                decentralized digital identity. It is based on the
                Self-sovereign identity paradigm. A DID uniquely identifies an
                entity (like a person or organization). These identifiers are
                designed to enable the controller of a DID(That is You) to prove
                control over it and to be implemented independently of any
                centralized registry, identity provider, or certificate
                authority
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text1}>
                What are Verifiable credentials ?
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.text2}>
                They can be best described as the digital equivalent of our
                physical Identifications, such as driving license, school
                certificate, or other offline identification documents. you can
                create VC of a physical proof you posses and wish to create a
                digtal tamper proof version of it and add it to your wallet. A
                VC can represent the same information you can find on your
                official issued physical document, such as personal information
                (name, photograph, birthdate) as well as data of who issued the
                verifiable credential (the government or recognized
                organization) or limitations in the form of an expiry date. The
                differnece is that the digtal VC is cryptographically sigend by
                a trusted issuer and hence can convince a verifer that the
                informations provided are authentic
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default InfoPage;
