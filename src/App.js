import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./history";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

//Pages
import Login from "./pages/login";
import Signup from "./pages/signup";

import Home from "./pages/home";

//Add Proof
import SelectIdForm from "./pages/Add_ID/selectIDForm";

//issuer
import issuerLogin from "./Issuer/issuerLogin";
import IssuerHome from "./Issuer/issuerHomescreen";

//verifier
import verifierLogin from "./verifier/verifierLogin";
import VerifierHome from "./verifier/verifierHome";
import ApplicationResponseDetails from "./verifier/responseDetails";

import CreateVc from "./pages/Forms/createVC";
import MainFormLayout from "./pages/Forms/shareCredential/shareCrendentialFormLayout";
import RequiredCredentials from "./pages/Forms/shareCredential/requiredCredentials";
import ApplicantDetails from "./Issuer/Applicant/applicantDetails";

//Componets
import Navbar from "./components/Layout/navbar";
import AuthRoute from "./util/AuthRoute";
import Sidebar from "./components/Layout/sidebar";
import ConfirmationScreen from "./pages/Forms/confirmationScreen";
import InfoPage from "./pages/infopage";

import SelectService from "./pages/ApplyService/selectService";
import { CredentialProvider } from "./helper/credentialContext";

//api calls
import { logoutUser } from "./components/API/affinidiUserAPI";

axios.defaults.baseURL =
  "https://cloud-wallet-api.prod.affinity-project.org/api";

const App = () => {
  const [token, setToken] = useState(localStorage.AccessToken);
  const [removeSideBar, setRemoveSideBar] = useState(true);

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      history.push("/login");
      logoutUser();
    } else {
      // store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
    }
  }
  const page = window.location.href.toString().split(window.location.host)[1];
  useEffect(() => {
    if (
      page === "/issuerLogin" ||
      page === "/verifierLogin" ||
      page === "/login" ||
      page === "/"
    ) {
      setRemoveSideBar(true);
    } else {
      setRemoveSideBar(false);
    }
  }, []);

  return (
    <Router history={history}>
      <CredentialProvider>
        <div className="App">
          <Navbar />
          <Grid container item>
            {!removeSideBar && (
              <Grid item xs={3} sm={2}>
                <Sidebar />
              </Grid>
            )}
            <Grid item xs={10} sm={10}>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/issuerLogin" component={issuerLogin} />
                <Route exact path="/issuerHome" component={IssuerHome} />
                <Route
                  exact
                  path="/applicantDetails"
                  component={ApplicantDetails}
                />

                <Route exact path="/verifierLogin" component={verifierLogin} />
                <Route exact path="/verifierHome" component={VerifierHome} />
                <Route
                  exact
                  path="/responseDetails"
                  component={ApplicationResponseDetails}
                />
                <Route
                  exact
                  path="/confirmation"
                  component={ConfirmationScreen}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Signup} />
                <Route exact path="/createVc" component={CreateVc} />
                <Route exact path="/formSelect" component={SelectIdForm} />
                <Route exact path="/selectService" component={SelectService} />
                <Route
                  exact
                  path="/shareCredential"
                  component={MainFormLayout}
                />
                <Route exact path="/information" component={InfoPage} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </CredentialProvider>
    </Router>
  );
};

export default App;
