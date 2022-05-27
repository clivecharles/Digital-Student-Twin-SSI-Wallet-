import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Card from "@mui/material/Card";

//icon
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

//style
const useStyles = makeStyles({
  buttonStyle: {
    p: 2,
    backgroundColor: "white",
    margin: "auto",
    minWidth: "150px",
    minHeight: "100px",
    flexGrow: 1,
    display: "flex",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "black",
  },
  iconStyle: {
    color: "#AB0014",
  },
});

//button to apply for verifiable credential and e-governmnent service in home page
const ButtonLayout = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={12} />
      <Grid item xs={2} sm={2} />
      <Grid item xs={3} sm={10}>
        <Card>
          <Button
            className={classes.buttonStyle}
            style={{
              minWidth: "150px",
              minHeight: "100px",
            }}
            //onClick={() => handleClick()}
            component={Link}
            to={{ pathname: "/formSelect" }} //redirects to form page where all verifiable credentials are shown
          >
            <Grid container>
              <Grid item xs={12}>
                <BadgeRoundedIcon
                  fontSize="large"
                  className={classes.iconStyle}
                />
              </Grid>
              <Grid item xs={12}>
                ADD Verifiable Credential
              </Grid>
            </Grid>
          </Button>
        </Card>
      </Grid>
      <Grid item xs={2} sm={2} />
      <Grid item xs={3} sm={10}>
        <Card>
          <Button
            className={classes.buttonStyle}
            component={Link}
            to={{ pathname: "/selectService" }} //redirects to select service page
          >
            <Grid container>
              <Grid item xs={12}>
                <AccountBalanceIcon
                  fontSize="large"
                  className={classes.iconStyle}
                />
              </Grid>
              <Grid item xs={12}>
                E-Government Services
              </Grid>
            </Grid>
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default ButtonLayout;
