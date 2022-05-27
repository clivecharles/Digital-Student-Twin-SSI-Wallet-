import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//components
import ReceivedIdentities from "./receivedIdentities";
import { Divider } from "@mui/material";

import { useEffect, useState } from "react";

//API call to gett all application sent by the student
import { getAllApplication } from "../components/API/firebaseAPI";

const IssuerHome = (props) => {
  //state that indicate the data has been received from the cloud wallet
  const [dataReceived, setdataReceived] = useState(false);

  //store the different credentials received
  const [certificateOfStudy, setCertificateOfStudy] = useState("");
  const [addressProof, setAddressProof] = useState("");
  const [insuranceProof, setInsuranceProof] = useState("");
  const [residencePermit, setResidencePermit] = useState("");
  const [swissEid, setSwissEid] = useState("");

  const data = {
    certificateOfStudy: certificateOfStudy,
    insuranceProof: insuranceProof,
    addressProof: addressProof,
    residencePermit: residencePermit,
    swissEid: swissEid,
  };

  useEffect(() => {
    const fetchIdentities = async () => {
      //to get all applications for a VC from the firestore database
      const applications = await getAllApplication().then((res) => {
        return res;
      });

      const responseData = await applications;

      //get the induvidual applications from a student and store them respective states
      responseData.map((ID) => {
        if (ID.data.matrikulationNr) {
          setCertificateOfStudy(ID.data);
        }
        if (ID.data.insuranceNr) {
          setInsuranceProof(ID.data);
        }
        if (ID.data.postalCode) {
          setAddressProof(ID.data);
        }
        if (ID.data.idType) {
          setSwissEid(ID.data);
        }
        if (ID.data.residencePermitCategory) {
          setResidencePermit(ID.data);
        }
      });
    };
    fetchIdentities()
      .then(() => {
        setdataReceived(true);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Box p={5}>
        <Typography variant="h5" fontWeight="bold">
          Pending Approvals
        </Typography>
        <br />
        <Divider />
      </Box>
      {dataReceived && (
        //only when data is received the following code is executed here we send the data received to the
        //receivedIdentities component
        <>
          {Object.keys(data).map((creds, i) => {
            if (data[creds] !== "") {
              return <ReceivedIdentities key={i} data={data[creds]} />;
            }
          })}
        </>
      )}
    </>
  );
};

export default IssuerHome;
