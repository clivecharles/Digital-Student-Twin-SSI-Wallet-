//here the signature type is added and returned back
export const SignCredentials = (uVC, data) => {
  const signFormat = {
    unsignedCredential: {
      ...uVC,
    },
    keyType: "bbs", //type of signature added to the credential to be signed
  };
  return signFormat;
};
