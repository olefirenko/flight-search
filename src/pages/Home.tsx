import React from "react";
import { FlightsList } from "../components/FlightsList";
import { Typography } from "@material-ui/core";

export const Home: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        TOKIGAMES ROCKS 🚀
      </Typography>
      <FlightsList></FlightsList>
    </>
  );
};
