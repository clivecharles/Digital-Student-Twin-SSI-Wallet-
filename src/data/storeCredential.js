//in order to store the data in the cloud wallet verifiable credential data needs to be stored in another  data object
export const StoreCredential = (data) => {
  const storeFormat = {
    data: [{ ...data }],
  };
  return storeFormat;
};
