import * as React from "react";
import { getSelectedAttributes } from "../../../../components/API/affinidiUserAPI";
import { transformVerifiableCredentials } from "./DataTransformation/transformVerifiableCredential";
import { getIdInfo } from "../../../../components/API/affinidiUserAPI";

export async function getSelectedCredentialsFromWallet(
  selectedCredentials, //the induvidual attributes selected fro the vs in the e-govt form
  claimId, //to identify whihc vc in the cloud wallet
  idproof = false // if this is true only the id proof will be sent in certain cases
) {
  return Promise.all(
    Object.keys(selectedCredentials).map((att) => {
      if (selectedCredentials[att].hasOwnProperty("matrikulationNr")) {
        var data = selectedCredentials[att];
        var selectedCred = [];
        //get all the attributes selected for a vc an put them in an array
        Object.keys(data).map((cred) => {
          if (data[cred] === true) {
            selectedCred.push(cred);
          }
        });
        return formatData(selectedCred, data.claimId);
      }
      if (selectedCredentials[att].hasOwnProperty("postalCode")) {
        var data = selectedCredentials[att];
        var selectedCred = [];
        //get all the attributes selected for a vc an put them in an array
        Object.keys(data).map((cred) => {
          if (data[cred] === true) {
            selectedCred.push(cred);
          }
        });

        return formatData(selectedCred, data.claimId);
      }
      if (selectedCredentials[att].hasOwnProperty("residencePermitCategory")) {
        var data = selectedCredentials[att];
        var selectedCred = [];
        //get all the attributes selected for a vc an put them in an array
        Object.keys(data).map((cred) => {
          if (data[cred] === true) {
            selectedCred.push(cred);
          }
        });
        return formatData(selectedCred, data.claimId);
      }
      //this is for the e-id as it is mandatory to send it the user cant select which atttibutes
      if (selectedCredentials[att].hasOwnProperty("identityProof") || idproof) {
        var selectedCred = [
          "firstName",
          "lastName",
          "dateOfBirth",
          "nationality",
          "gender",
          "expiryDate",
        ];
        return formatData(selectedCred, claimId);
      }
    })
  );
}

async function formatData(creds, id) {
  //api call to get the vc with the selected credentials only
  return getSelectedAttributes(creds, id).then((res) => {
    //transform the object into a from we need
    return transformVerifiableCredentials(res);
  });
}
