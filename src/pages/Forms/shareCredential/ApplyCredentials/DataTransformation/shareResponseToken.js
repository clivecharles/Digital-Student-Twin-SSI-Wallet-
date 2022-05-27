import { createCredentialShareResponseToken } from "../../../../../components/API/affinidiUserAPI";

//function to create share reponse token
export async function responseToken(credentials) {
  //getting the share request token stored in local store of the brower
  const credentialShareRequestToken = localStorage.getItem(
    "credentialShareRequest"
  );

  //creating the object to to respond to the share request token
  const verifiableCredentials = {
    credentialShareRequestToken: credentialShareRequestToken,
    credentials: credentials,
  };

  //api call to create shareresponsetoken
  const response = await createCredentialShareResponseToken(
    verifiableCredentials
  );

  return response;
}
