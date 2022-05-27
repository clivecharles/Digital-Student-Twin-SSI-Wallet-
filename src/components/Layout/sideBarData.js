import React from "react";

//icon
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";

//function
import { logoutUser } from "../API/affinidiUserAPI";

var page;
//to get the site info we are currently on
const siteInfo = window.location.href.toString().split(window.location.host)[1];

//to properly redirect to a given page when clickling on a side bar item in various accounts that is issuer verifier and student
if (siteInfo === "/verifierHome") {
  page = "/verifierHome";
}

if (siteInfo === "/issuerHome" || siteInfo === "/applicantDetails") {
  page = "/issuerHome";
}

if (
  siteInfo === "/home" ||
  siteInfo === "/formSelect" ||
  siteInfo === "/selectService" ||
  siteInfo === "/shareCredential" ||
  siteInfo === "/createVC" ||
  siteInfo === "/confirmation"
) {
  page = "/home";
}

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: page,
  },
  {
    title: "Information",
    icon: <InfoIcon />,
    link: "/Information",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
    action: () => logoutUser(), //logout function called
  },
];
