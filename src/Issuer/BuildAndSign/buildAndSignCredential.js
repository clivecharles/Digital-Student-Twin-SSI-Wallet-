//issuer api
import { CreateVerifiableData } from "../../components/API/affinidiAdminApi";
import { SignVerifiableData } from "../../components/API/affinidiAdminApi";

//format data
import { certificateOfStudy } from "../../data/certificateOfStudy";
import { addressProof } from "../../data/addressProof";
import { residencePermit } from "../../data/residencePermit";
import { swissEid } from "../../data/swissEid";
import { insuranceProof } from "../../data/insuranceProof";

import { SignCredentials } from "../../data/signCredentials";

export async function BuildAndSign(data) {
  var formated_data;
  //format the data according the the credentials received
  //different unique attributes of credentials are used as a refernce point to ensure the data format we received
  if (data.matrikulationNr) {
    formated_data = certificateOfStudy(data);
  } else if (data.streetAddress) {
    formated_data = addressProof(data);
  } else if (data.ahvNr) {
    formated_data = insuranceProof(data);
  } else if (data.residencePermitCategory) {
    formated_data = residencePermit(data);
  } else if (data.idType) {
    formated_data = swissEid(data);
  } else return null;

  //1. Build UnsignedCredential
  const unsignedCredential = await CreateVerifiableData(formated_data).then(
    (res) => {
      return res;
    }
  );

  //2. Format the UnsignedCredential
  const formated_UnsignedCredential = SignCredentials(unsignedCredential);
  //3. Sign The credentials
  const signedCredential = await SignVerifiableData(
    formated_UnsignedCredential
  ).then((res) => {
    return res;
  });

  //send back the signed credentials
  return signedCredential;
}
