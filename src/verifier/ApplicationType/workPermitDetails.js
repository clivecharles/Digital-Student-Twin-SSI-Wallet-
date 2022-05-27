import * as React from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";

//the image style
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

//structure of the work permit details view page
const WorkPermitDetails = (props) => {
  return (
    <Grid container item xs={12} sm={12}>
      <Grid item container sm={6}>
        <Grid item sm={12}>
          <Typography variant="h6" fontWeight="bold">
            Verify the application using the response token
          </Typography>
          <br />
        </Grid>
        <Grid item sm={12}>
          <small>
            <Typography variant="h" fontWeight="bold">
              To verify copy response token and{" "}
            </Typography>
            <Link
              to={{
                // link to verify the respone token
                pathname: "https://verifier-token.vc-generator.com/",
              }}
              target="_blank"
            >
              click here
            </Link>
          </small>

          <br />
        </Grid>
        <Grid item sm={12}>
          <TextareaAutosize
            maxRows={10}
            aria-label="maximum height"
            placeholder="Reponse Token"
            defaultValue={props.data.responseToken} //getting the response token from the data received
            style={{ width: 700 }}
          />
        </Grid>

        <Grid container item sm={12} xs={12}>
          <Grid item sm={12} xs={12}>
            <br />
            <br />
            <Typography variant="h6" fontWeight="bold">
              Provided Document
            </Typography>
            <Divider />
          </Grid>
          {props.data.images.map((doc, key) => {
            // here we are displaying any images received
            return (
              <Grid item sm={5} key={key}>
                <ButtonBase sm={{ width: 50, height: 50 }}>
                  <Img alt="complex" src={doc} />
                </ButtonBase>
                <br />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkPermitDetails;
