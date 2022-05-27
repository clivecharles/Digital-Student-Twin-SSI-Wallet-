export const transformVerifiableCredentials = (data) => {
  const holderDID = data.holder;

  //when we get the selected credentials from our wallet the
  //the holder property is not set as an object hence we have to transform it into an object
  data.holder = {
    id: holderDID,
  };

  //this property has to be deleted as the api sees this as an excessive information which is not reuqired
  delete data.credentialSchema;

  const formated_credential = data;

  return formated_credential;
};
