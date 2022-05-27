import { React, useState, useRef } from "react";
import Grid from "@mui/material/Grid";

//various application forms
import HolderCertificateOfStudy from "./holderForms/holderCertificateOfStudy";
import HolderAddressProof from "./holderForms/holderAddressProof";
import HolderSwissEid from "./holderForms/holderSwissEid";
import HolderResidencePermit from "./holderForms/holderResidencePermit";
import HolderInsuranceProof from "./holderForms/holderInsuranceProof";

//the confirmation screen page
import Confirmation from "./confirmationScreen";

//custom stepper component
import Stepper from "../../components/FormsUI/stepper";

//API calls to upload application to firevase
import { postApplication } from "../../components/API/firebaseAPI";
//api call to get id attributes from wallet
import { getSelectedCredentialsFromWallet } from "./shareCredential/ApplyCredentials/SetCredentialsToBeShared";
import { getIdInfo } from "../../components/API/affinidiUserAPI";

//to genereate the reponse token from the student to the issuer
import { responseToken } from "../Forms/shareCredential/ApplyCredentials/DataTransformation/shareResponseToken";

//application from to be filled to creaed a verifable credential
const CreateVc = (props) => {
  const { state } = props.location;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //timer to wait for specific amount of time
  const timer = useRef();

  var Holder; //store the holder type

  //identifying which holder form component to use by extracting certain detials of the data received
  const applyHolderForm = () => {
    if (state.hasOwnProperty("matrikulationNr")) {
      Holder = HolderCertificateOfStudy;
    } else if (state.hasOwnProperty("streetAddress")) {
      Holder = HolderAddressProof;
    } else if (state.hasOwnProperty("idType")) {
      Holder = HolderSwissEid;
    } else if (state.hasOwnProperty("gender")) {
      Holder = HolderResidencePermit;
    } else if (state.hasOwnProperty("ahvNr")) {
      Holder = HolderInsuranceProof;
    } else {
      return null;
    }
  };

  //this function call is neccesary to see which from should be laoded
  applyHolderForm();

  //to store the application data
  const [data, setData] = useState({
    ...state,
  });

  //function to handle final submit
  async function handleFinalSubmit(finaldata) {
    var token;
    //to get the swiss e-id data
    const getInfo = await getIdInfo().then((res) => {
      //here we get the specific claim id in order to differentiate between other credentials in the wallet
      const claimID = res.claimId;
      //when we get the selected attributes from this function we need to tell that we are looking for the identity proof
      const data = getSelectedCredentialsFromWallet(
        [{ identityProof: true }],
        claimID
      )
        .then((res) => {
          return res;
        })
        .then((data) => {
          ///here we get the response token which the issuer can verify if the identity was issued by a authorized provider
          const respone = responseToken(data)
            .then((res) => {
              return res;
            })
            .then((token) => {
              //to store the response token in the final data to be submitted 
              finaldata.tok = token;

              //here we are actually posting the application to the firestore database using an api call
              postApplication(finaldata);
            });
        });
    });
    return token;
  }

  //steps to show the correct form proceger
  const [currentStep, setCurrentStep] = useState(0);
  //current step to show in the stepper componnet
  const [activeStep, setActiveStep] = useState(0);

  //handle the next step in the from
  const handleNextStep = (newData, final = false, type) => {
    // here we set the data filled by the user
    setData((prev) => ({ ...prev, ...newData }));

    //function to set the current step in order to move forward in the stepper
    setActiveStep((curr) => {
      if (curr < 1) {
        return curr + 1;
      }
    });

    //loading button until api calls are done
    const handleButtonClick = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setCurrentStep((prev) => prev + 1);
          return false;
        }, 8000);
      }
    };

    // if the user submits the from final will be true and the function call to store the details in the database is made
    if (final) {
      //get the DID of the student stored in local storage in order to identify the student
      const did = localStorage.getItem("DID");

      //put the did in the application form object
      newData.did = did;
      newData.applicationType = type;

      if (type === "swiss e-id") {
        //this step is only taken for the swiss e-id application as it is the initial application and other data such as
        //firstname and last name and data of birth can not be taken from the cloud wallet
        postApplication(newData);
      } else {
        //in this handles all other application submission because now we can take the e-id as identity proof
        handleFinalSubmit(newData);
      }
    }

    //handle the next step
    if (currentStep < 1) {
      handleButtonClick();
    }
  };

  const steps = [
    <Holder next={handleNextStep} data={data} />,
    <Confirmation next={handleNextStep} data={data} />,
  ];

  return (
    <Grid container>
      <Grid item md={12}>
        <Stepper step={activeStep} />
      </Grid>
      <Grid item>
        <div>{steps[currentStep]}</div>
      </Grid>
    </Grid>
  );
};

export default CreateVc;
