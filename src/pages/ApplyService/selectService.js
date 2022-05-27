import * as React from "react";

//availalble E-government Services
import RenewResidencePermit from "./Services/renewResidencePermit";
import ApplyWorkPermit from "./Services/applyWorkPermit";

import { Grid } from "@mui/material";

//dispaly the avialable e-govt services
const SelectService = () => {
  return (
    <Grid container>
      <Grid>
        <RenewResidencePermit />
      </Grid>
      <Grid>
        <ApplyWorkPermit />
      </Grid>
    </Grid>
  );
};

export default SelectService;
