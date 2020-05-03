import React from "react";
import { AddFlight } from "../components/AddFlight";
import { Typography } from "@material-ui/core";

export const NewFlight: React.FC = () => {
  return (
    <>
      <Typography component="h1" variant="h4">
        Add New Flight
      </Typography>
      <AddFlight></AddFlight>
    </>
  );
};
