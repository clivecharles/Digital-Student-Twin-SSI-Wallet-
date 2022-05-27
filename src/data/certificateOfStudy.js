//function to transform data into a verifiable data format for a certificate of study
export const certificateOfStudy = (data) => {
  const certificateDetails = {
    type: "EducationCredentialPersonV1",
    data: {
      "@type": ["Person", "PersonE", "EducationPerson"],
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      educationalInstitution: data.educationalInstitution,
      semesterPeriod: data.semesterPeriod,
      educationalLevel: data.educationalLevel,
      matrikulationNr: data.matrikulationNr,
      faculty: data.faculty,
      program: data.program,
      expiryDate: data.expiryDate,
      hasCredential: {
        "@type": "EducationalOcupationalCredential",
        recognizedBy: {
          "@type": ["Organization", "OrganizationE"],
          name: "University of Zurich",
          docType: "Certificate Of Study",
        },
        url: "https://www.university.edu/credential/credentialId",
      },
    },
    holderDid: data.did,
  };
  return certificateDetails;
};
