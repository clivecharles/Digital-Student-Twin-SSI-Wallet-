//function to transform data into a verifiable data format for address VC
export const addressProof = (data) => {
  const addressDetails = {
    type: "AddressCredentialPersonV1",
    data: {
      "@type": ["Person", "PersonE", "AddressPerson"],
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      streetAddress: data.streetAddress,
      city: data.city,
      region: data.region,
      postalCode: data.postalCode,
      hasCredential: {
        "@type": "PostalAddress",
        recognizedBy: {
          name: "Canton of Zurich",
          docType: "Address Proof",
        },
      },
    },
    holderDid: data.did,
  };
  return addressDetails;
};
