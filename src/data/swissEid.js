export const swissEid = (data) => {
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
          documentType: "Swiss E-id",
          countryCode: "+41",
        },
      },
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      idType: "Student",
      expiryDate: "2022-08-14",
      registrationNr: randomString(),
    },
    holderDid: data.did,
  };
  return permitDetails;
};

//random string generator to add as register number
function randomString() {
  //Can change 7 to 2 for longer results.
  let r = (Math.random() + 1).toString(36).substring(2);

  return r;
}
