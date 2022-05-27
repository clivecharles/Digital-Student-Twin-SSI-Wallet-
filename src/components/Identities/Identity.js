import React, { useState, useEffect } from "react";

//material UI
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

//components
import AvailableProofs from "./IdentityEntity/availableProofs";
import Cart from "../Modal/Cart";

//API Call
import { getallverifiablecredentials } from "../API/affinidiUserAPI";
import { deleteCredential } from "../API/affinidiUserAPI";
//styles
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
  },
}));

const Identity = () => {
  const [selectedIdentityModal, setSelectedIdentityModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  //here are all the proofs stored in the form of cards
  const [recentidentitiesmarkup, setRecentidentitiesmarkup] = useState(null);
  const [credentialData, setCredentialData] = useState(null);
  const [noAvailableProofs, setNoAvailableProofs] = useState(false);

  const classes = useStyles();

  //here we fetch all the proofs which are stored in the affinidi cloud wallet
  useEffect(() => {
    let isMounted = true;
    const fetchIdentities = async () => {
      const identities = await getallverifiablecredentials().then((res) => {
        if (isMounted) {
          return res;
        }
      });

      //receive the response from the api all
      const responseData = await identities;

      //check the lenght of the response to see if any data was received
      if (responseData.length === 0) {
        setNoAvailableProofs(true);
      }

      //set up card component with induvidual proofs
      let identitiesmarkup = responseData.map((ID) => (
        <AvailableProofs
          modalHandler={modalHandler}
          deleteCredential={deleteCredentialHandler}
          key={ID.id}
          proof={ID}
        ></AvailableProofs>
      ));

      //here are all the proofs stored in the form of cards
      setRecentidentitiesmarkup(identitiesmarkup);
    };
    fetchIdentities().catch((error) => {
      console.log("Info", error);
    });
    return () => {
      //    setLoading(true);
      isMounted = false;
    };
  }, []);

  //to set the state of the modal in order to open and close a given modal
  const modalHandler = (id = null, credentials) => {
    if (modalOpen) {
      setModalOpen(false);
      setSelectedIdentityModal(null);
    } else {
      setModalOpen(true);
      setSelectedIdentityModal(id);
      //if the modal is opened then the appropriate credentials are shown for the vc
      setCredentialData(credentials);
    }
  };

  //delete function to delete the VC from the card componet button
  const deleteCredentialHandler = (claimerID) => {
    deleteCredential(claimerID);
  };

  return (
    <>
      {noAvailableProofs ? ( // this is displayed when there are no proofs in the wallet
        <Box p={5}>
          <Typography className={classes.text}>
            No proofs in your wallet
          </Typography>
        </Box>
      ) : (
        //to display  all the proofs stored in the form of cards
        <Grid item sm={12} xs={12}>
          {recentidentitiesmarkup}
        </Grid>
      )}

      {modalOpen && ( //to open the modal view with the credential details
        <Cart
          id={selectedIdentityModal}
          modalHandler={modalHandler}
          data={credentialData} //the VC data is passed here so that the details can be showed in the modal
        ></Cart>
      )}
    </>
  );
};

export default Identity;
