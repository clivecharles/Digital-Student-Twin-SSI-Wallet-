import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";

//components
import ReceivedResponseToken from "./receivedResponseToken";
//Api function to gett all response token from the firestore database
import { getAllResponseToken } from "../components/API/firebaseAPI";

//home page of the verifier account
const VerifierHome = (props) => {
  const [dataReceived, setdataReceived] = useState(false);

  //here we store the received application like work permit or residencepermit renewal
  const [workPermit, setworkPermit] = useState("");
  const [residencePermit, setResidencePermit] = useState("");

  const data = {
    workPermit: workPermit,
    residencePermit: residencePermit,
  };

  //this fetches the application from the firestore database
  useEffect(() => {
    const fetchIdentities = async () => {
      const applications = await getAllResponseToken().then((res) => {
        return res;
      });

      const responseData = await applications;
      //get the induvidual applications from a student and store them respective states
      responseData.map((ID) => {
        if (ID.applicationType === "Renew Residence Permit") {
          setResidencePermit(ID);
        }
        if (ID.applicationType === "Apply Work Permit") {
          setworkPermit(ID);
        }
      });
    };
    fetchIdentities()
      .then(() => {
        setdataReceived(true);
      })
      .catch((error) => {
        console.log("Info", error);
        // setHttpError(error.message);
      });
  }, []);

  return (
    <>
      <Box p={5}>
        <Typography variant="h5" fontWeight="bold">
          Pending applications
        </Typography>
        <br />
        <Divider />
      </Box>
      {dataReceived && ( //only when data is present we sent it to the ReceiveResponseToken component
        <>
          {Object.keys(data).map((creds, i) => {
            if (data[creds] !== "") {
              return <ReceivedResponseToken key={i} data={data[creds]} />;
            }
          })}
        </>
      )}
    </>
  );
};

export default VerifierHome;
