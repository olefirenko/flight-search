import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { RootState } from "../stores";
import {
  getFlights,
  deleteFlight,
  resetError,
  editFlight,
} from "../stores/flights/actions";
import MaterialTable from "material-table";
import { Flight, FlightType } from "../stores/flights/types";
import { useSnackbar } from "notistack";

const tableColumns = [
  { title: "Departure", field: "departure" },
  { title: "Arrival", field: "arrival" },
  {
    title: "Departure Time",
    field: "departureTime",
    type: "datetime" as const,
  },
  { title: "Arrival Time", field: "arrivalTime", type: "datetime" as const },
  {
    title: "Type",
    field: "flightType",
    lookup: { Cheap: FlightType.CHEAP, Business: FlightType.BUSINESS },
  },
];

export const FlightsList: React.FC = () => {
  const dispatch = useDispatch();
  const { flights, error, isFetching, fetched } = useSelector(
    (store: RootState) => store.flightsStore
  );
  const { enqueueSnackbar } = useSnackbar();

  const flightsTransformed = flights.map((flight: Flight) => {
    const transformed = {
      ...flight,
    };
    return transformed;
  });

  useEffect(() => {
    fetched || dispatch(getFlights());
  }, [fetched, dispatch]);

  useEffect(() => {
    if (error !== null) {
      enqueueSnackbar(`Failed to get data (${error})`, { variant: "error" });
      dispatch(resetError());
    }
  }, [error, enqueueSnackbar, dispatch]);

  if (isFetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid item xs={12}>
      <MaterialTable
        columns={tableColumns}
        data={flightsTransformed}
        title=""
        editable={{
          onRowUpdate: (newFlightData, oldFlightData) =>
            new Promise((resolve) => {
              dispatch(editFlight(newFlightData, oldFlightData as Flight));
              enqueueSnackbar(`Updated`, { variant: "success" });
              resolve();
            }),
          onRowDelete: (rowData) =>
            new Promise((resolve) => {
              dispatch(deleteFlight(rowData.uuid));
              enqueueSnackbar(`Deleted`, { variant: "success" });
              resolve();
            }),
        }}
      />
    </Grid>
  );
};
