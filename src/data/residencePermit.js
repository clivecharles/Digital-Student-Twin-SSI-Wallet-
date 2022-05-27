//function to transform data into a verifiable data format for residence permit VC
export const residencePermit = (data) => {
  const permitDetails = {
    type: "IDDocumentCredentialPersonV1",
    data: {
      "@type": ["Person", "PersonE", "IDDocumentPerson"],
      hasIDDocument: {
        "@type": ["Role", "IDDocumentRole"],
        hasIDDocument: {
          "@type": ["CreativeWork", "IDDocument"],
          issuer: {
            "@type": "Canton",
            name: "Canton Zurich",
          },
          documentType: "Residence Permit",
          countryCode: "+41",
        },
      },
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      residencePermitCategory: data.residencePermitCategory,
      expiryDate: data.expiryDate,
      birthPlace: data.birthPlace,
      remark: data.remark,
      dateOfEntry: data.dateOfEntry,
      issueDate: data.issueDate,
    },
    holderDid: data.did,
  };
  return permitDetails;
};
