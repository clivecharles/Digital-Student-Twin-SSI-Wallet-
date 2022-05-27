//function to transform data into a verifiable data format for insurance proof VC
export const insuranceProof = (data) => {
  const insuranceDetails = {
    type: "InsuranceAccountCredentialPersonV1",
    data: {
      "@type": ["Person", "PersonE", "InsuredPerson"],
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      ahvNr: data.ahvNr,
      insuranceNr: data.insuranceNr,
      bagNr: data.bagNr,
      expiryDate: data.expiryDate,
      hasCredential: {
        "@type": "Insurance",
        recognizedBy: {
          name: "SWICCA Insurance",
          docType: "Insurance",
        },
      },
    },
    holderDid: data.did,
  };
  return insuranceDetails;
};
