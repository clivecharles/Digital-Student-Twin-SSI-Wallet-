import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
//mui stuff
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";

import classes from "./navbar.module.css";

//the navigation bar
const Navbar = () => {
  const [loginPage, setLoginPage] = useState(window.location.href);
  const [navbar, setnavbar] = useState(false);
  const [issuer, setIssuer] = useState(false);
  const [verifier, setVerifier] = useState(false);
  const [student, setStudent] = useState(false);

  useEffect(() => {
    let isMounted = true; // note mutable flag

    //to get the current site info we are on
    const siteInfo = window.location.href
      .toString()
      .split(window.location.host)[1];

    //to show the navbar only on the specified screens below
    if (isMounted) {
      if (
        siteInfo === "/login" ||
        siteInfo === "/issuerLogin" ||
        siteInfo === "/verifierLogin" ||
        siteInfo === "/"
      ) {
        setnavbar(true);
      }

      // when we are on one of the below mentioed pages the nav bar will show the title of the account we are in that is "issuer" "verifier" or "student wallet" on the left side of the navbar
      if (siteInfo === "/issuerHome") {
        setIssuer(true);
      }
      if (siteInfo === "/verifierHome") {
        setVerifier(true);
      }
      if (siteInfo === "/home") {
        setStudent(true);
      }
    }

    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, [loginPage]);

  return (
    <AppBar style={{ backgroundColor: "#053E59" }}>
      <Toolbar>
        {issuer ? <Typography className={classes.text}>Issuer</Typography> : ""}
        {verifier ? (
          <Typography className={classes.text}>Verifier</Typography>
        ) : (
          ""
        )}
        {student ? (
          <Typography className={classes.text}>Student Twin Wallet</Typography>
        ) : (
          ""
        )}
        {navbar && (
          <div className="nav-container">
            <Button color="inherit" component={Link} to="/login">
              Student
            </Button>
            <Button color="inherit" component={Link} to="/issuerLogin">
              Issuer
            </Button>
            <Button color="inherit" component={Link} to="/verifierLogin">
              Verifier
            </Button>
            <Button color="inherit" component={Link} to="/">
              Signup
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
