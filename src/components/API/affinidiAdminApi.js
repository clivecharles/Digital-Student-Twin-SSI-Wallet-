import axios from "axios";

// the api key given at the time when signing up for an Affinidi account
let axiosConfig = {
  headers: {
    "Api-Key":
      "e20da7fdf35c419aa2aca16f6185949fdaf272b1afe33ee2c0efc327b6ae218b",
  },
};

//api call to create VC
export async function CreateVerifiableData(data) {
  const response = await axios({
    method: "post",
    headers: axiosConfig.headers,
    url: "https://affinity-issuer.prod.affinity-project.org/api/v1/vc/build-unsigned",
    data: data,
  });

  const responseData = await response.data;
  const final = responseData.unsignedCredential;

  return final;
}

//login issuer
export async function LoginIssuer(data, history) {
  if (data.userName !== "Issuer") {
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
        //set the header with the access token from issuer account
        setAuthorizationHeader(res.data);
        history.push("/issuerHome");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log("Info", err);
    });

  const responseData = await response;
}

//login verifier
export async function LoginVerifier(data, history) {
  if (data.userName !== "Verifier") {
    return "error";
  }
  const response = await axios({
    method: "post",
    // this is the api key of the verifier
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login",
    data: {
      username: data.userName,
      password: data.password,
    },
  })
    .then((res) => {
      if (res.statusText === "OK") {
        //set the header with the access token from verifier account
        setAuthorizationHeader(res.data);
        history.push("/verifierHome");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log("Info", err);
    });

  const responseData = await response;
}

//generate request token from the verifier
export async function generatedRequestToken(requiredData) {
  var auth;
  const response = await axios({
    method: "post",
    // this is the api key of the issuer
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login",
    data: {
      username: "Verifier",
      password: "Hesoyam_123",
    },
  }).then((res) => {
    if (res.statusText === "OK") {
      //here we get the access token in oder to make the api call in the name of the verifier account
      auth = res.data.accessToken;
    }
  });

  const response_two = await axios({
    method: "post",
    // this is the api key of the verifier
    headers: {
      "Api-Key":
        "e20da7fdf35c419aa2aca16f6185949fdaf272b1afe33ee2c0efc327b6ae218b",
      Authorization: auth,
    },
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credential-share-token/generate-request-token",
    data: {
      requirements: [
        {
          type: requiredData,
        },
      ],
    },
  }).then((res) => {
    //store the request token in the local storage
    localStorage.setItem("credentialShareRequest", res.data);
  });

  const responseData = await response;
}

//generate request token from the issuer account
export async function generatedRequestTokenIssuer(requiredData) {
  var auth;
  const response = await axios({
    method: "post",
    // this is the api key of the issuer
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/users/login",
    data: {
      username: "Issuer",
      password: "Hesoyam_123",
    },
  }).then((res) => {
    if (res.statusText === "OK") {
      //here we get the access token in oder to make the api call in the name of the issuer account
      auth = res.data.accessToken;
    }
  });

  const response_two = await axios({
    method: "post",
    // this is the api key of the issuer
    headers: {
      "Api-Key":
        "e20da7fdf35c419aa2aca16f6185949fdaf272b1afe33ee2c0efc327b6ae218b",
      Authorization: auth,
    },
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credential-share-token/generate-request-token",
    data: {
      requirements: [
        {
          type: requiredData,
        },
      ],
    },
  }).then((res) => {
    //store the request token in the local storage
    localStorage.setItem("credentialShareRequest", res.data);
  });

  //const responseData = await response;
}

//api call to sign the credentials with a signature suite
export async function SignVerifiableData(data) {
  const response = await axios({
    method: "post",
    headers: axiosConfig.headers,
    url: "https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/sign-credential",
    data: data,
  });

  const responseData = await response.data;
  const final = responseData.signedCredential;

  return final;
}

//to set the access token in the local storage as well as the DID
const setAuthorizationHeader = (response) => {
  const FBIdToken = response.accessToken;
  localStorage.setItem("AccessToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
  const did = response.did;
  localStorage.setItem("DID", did);
};
