import * as React from "react";
import Grid from "@mui/material/Grid";

//components
//shareable credentials which are in the form of select attributes
import ShareCertificateOfStudy from "./shareableCredentials/shareCertificateOfStudy";
import ShareAddressProof from "./shareableCredentials/shareAddressProof";
import ShareResidencePermit from "./shareableCredentials/shareResidencePermit";

//here we specify the required credentials needed for a e-governmnet service
const RequiredCredentials = (props) => {
  const requiredCredentialData = props.data;

  //here we check which required credentials were passed to be shown on the form
  const certificateOfStudy = requiredCredentialData.certificateOfstudy
    ? requiredCredentialData.certificateOfstudy
    : null;
  const residencePermit = requiredCredentialData.residencePermit
    ? requiredCredentialData.residencePermit
    : null;
  const addressProof = requiredCredentialData.addressProof
    ? requiredCredentialData.addressProof
    : null;

  //here we get the selected attributes and pass it to the parent component (sharecredentialsFormLayout)
  const handleSuppliedCredential = (creds) => {
    props.share(creds);
  };

  return (
    <>
      {certificateOfStudy && (
        <Grid item sm={4} xs={12}>
          <ShareCertificateOfStudy
            data={certificateOfStudy}
            handleSubmit={handleSuppliedCredential}
          />
        </Grid>
      )}
      <Grid item sm={1} />
      {addressProof && (
        <Grid item sm={4} xs={12}>
          <ShareAddressProof
            data={addressProof}
            handleSubmit={handleSuppliedCredential}
          />
        </Grid>
      )}

      {residencePermit && (
        <Grid item sm={4} xs={12}>
          <br />
          <ShareResidencePermit
            data={residencePermit}
            handleSubmit={handleSuppliedCredential}
          />
        </Grid>
      )}
    </>
  );
};

export default RequiredCredentials;
