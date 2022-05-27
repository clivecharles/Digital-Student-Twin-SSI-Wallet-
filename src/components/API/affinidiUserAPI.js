import axios from "axios";
import { StoreCredential } from "../../data/storeCredential";

//the api key of the student wallet
let axiosConfig = {
  headers: {
    "Api-Key":
      "5f99b3eca52ae65737d922a29b78191bc8f2eff52a5d670f20965bc68aa0b40d",
  },
};

//login the student
export async function LoginUser(data, history) {
  if (data.userName === "Issuer" || data.userName === "Verifier") {
    return "error";
  }

  const response = await axios({
    method: "post",
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login",
    data: {
      username: data.userName,
      password: data.password,
    },
  })
    .then((res) => {
      if (res.statusText === "OK") {
        //set the access token in the local storage
        setAuthorizationHeader(res.data);
        history.push("/home");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log("Wrong Credentials check again", err);
      return err;
    });

  const error = await response;

  if (error) {
    return "error";
  }
}

//to create a student wallet account
export async function SignUpUser(data, history) {
  const response = await axios({
    method: "post",
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/signup",
    data: {
      username: data.userName,
      password: data.passwordConfirmation,
    },
  })
    .then((res) => {
      if (res.statusText === "OK") {
        history.push("/login");
      }
    })
    .catch((err) => {
      console.log("Wonrg Credentials check again", err);
    });
}

//api call to store VC in cloud wallet of affinidi
export async function StoreVerifiableData(data) {
  const formated_data = StoreCredential(data);

  const response = await axios({
    method: "post",
    //if the login works correctly and the authorization header is set the auth has not expliclity to be mentioned here
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials",
    data: formated_data,
  })
    .then(() => {})
    .catch((err) => {
      console.log("Info", err);
    });

  const responseData = await response;
}

//to get all VCs in the cloud wallet
export async function getallverifiablecredentials() {
  const response = await axios({
    method: "get",
    //if the login works correctly and the authorization header is set the auth has not expliclity to be mentioned here
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials",
  });

  const responseData = await response;

  return responseData.data;
}

//to get the id info of the swiss e-ID
export async function getIdInfo() {
  var userInfo = {};
  const application = await getallverifiablecredentials().then((res) => {
    res.map((data) => {
      if (data.credentialSubject.data.hasIDDocument) {
        if (data.credentialSubject.data.hasIDDocument.hasIDDocument) {
          userInfo.firstName = data.credentialSubject.data.firstName;
          userInfo.lastName = data.credentialSubject.data.lastName;
          userInfo.dateOfBirth = data.credentialSubject.data.dateOfBirth;
          userInfo.claimId = data.id;
        }
      } else {
        return;
      }
    });

    return userInfo;
  });

  const responseData = await application;

  return responseData;
}

//here we create a responsetoken in order to reply to the request token sent by the issuer or the verifier
export async function createCredentialShareResponseToken(
  verifiableCredentials
) {
  const response = await axios({
    method: "post",
    //if the login works correctly and the authorization header is set the auth has not expliclity to be mentioned here
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credential-share-token/create-response-token",
    data: verifiableCredentials,
  });

  const responseData = await response.data;

  return responseData;
}

//this api call is used to get the induvidual attributes of a VC by specifying the claimer ID
export async function getSelectedAttributes(attributes, claimId) {
  const response = await axios({
    method: "post",
    headers: axiosConfig.headers,
    url: `https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials/${claimId}/share`,
    data: {
      ttl: "0", //means this the generated link expires in 100 hours
      fieldsToShare: attributes,
    },
  });

  //it is in an url hence we need to extract it
  const { sharingUrl } = await response.data;

  //get the response from the URL
  const url_response = await axios
    .get(sharingUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Info", err);
    });

  //here we get the actual VC with only the selected attributes
  const verifiableCredential = await url_response;

  return verifiableCredential;
}

//to logout all user that is student issuer and verifier
export async function logoutUser() {
  const response = await axios({
    method: "post",
    //if the login works correctly and the authorization header is set the auth has not expliclity to be mentioned here
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/logout",
  })
    .then(() => {
      //here we remove all the data from the local storge
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("DID");
      localStorage.removeItem("credentialShareRequest");
      delete axios.defaults.headers.common["Authorization"];
      window.location.reload();
    })
    .catch((err) => {
      console.log("Something went wrong ", err);
    });
}

//api call to delete VC from the cloud wallet
export async function deleteCredential(claimId) {
  const response = await axios({
    method: "delete",
    //if the login works correctly and the authorization header is set the auth has not expliclity to be mentioned here
    headers: axiosConfig.headers,
    url: `https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials/${claimId}`,
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log("something went wrong", err);
    });
}

//to set the access token in the local storage as well as the DID
const setAuthorizationHeader = (response) => {
  const FBIdToken = response.accessToken;
  localStorage.setItem("AccessToken", FBIdToken);
  const did = response.did;
  localStorage.setItem("DID", did);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
