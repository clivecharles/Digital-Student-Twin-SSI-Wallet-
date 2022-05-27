import React from "react";
import { SidebarData } from "./sideBarData";

import "../../App.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { useContext } from "react";
//context
import { CredentialContext } from "../../helper/credentialContext";

//Image
import userImg from "../../Images/user.jpg";
import adminImg from "../../Images/verifierUser.jpg";

//image style
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "100%",
});

const Sidebar = (props) => {
  //to get the site info we are currently on
  const siteInfo = window.location.href
    .toString()
    .split(window.location.host)[1];

  var page;

  if (siteInfo === "/verifierHome") {
    page = "verifier";
  }

  if (siteInfo === "/issuerHome" || siteInfo === "/applicantDetails") {
    page = "issuer";
  }

  if (
    siteInfo === "/home" ||
    siteInfo === "/formSelect" ||
    siteInfo === "/selectService" ||
    siteInfo === "/shareCredential" ||
    siteInfo === "/createVC" ||
    siteInfo === "/confirmation"
  ) {
    page = "student";
  }

  const [credential, setCredentials] = useContext(CredentialContext);
  return (
    <div className="Sidebar">
      <Grid container item>
        <Box p={3}>
          <Grid item xs={12} sm={12} align="center">
            <ButtonBase
              xs={{ width: 100, height: 100 }}
              sm={{ width: 100, height: 100 }}
            >
              {page === "verifier" && (
                //profile of the verifier
                <Img alt="complex" src={adminImg} />
              )}

              {page === "issuer" && (
                //profile of the issuer
                <Img alt="complex" src={adminImg} />
              )}
              {page === "student" && (
                //profile of the issuer
                <Img alt="complex" src={userImg} />
              )}
            </ButtonBase>
          </Grid>
        </Box>
        <Box p={2}>
          <Typography>Welcome {credential}</Typography>
        </Box>
      </Grid>
      <ul className="SidebarList">
        <Divider />
        {SidebarData.map((val, key) => {
          return (
            <Button
              component={Link}
              className="row"
              key={key}
              to={val.link}
              onClick={val.action ? () => val.action() : null}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </Button>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
