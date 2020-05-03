import {
  FLIGHTS_FETCH_REQUESTED,
  FlightsFetchRequestedAction,
  FLIGHTS_FETCH_SUCCEEDED,
  Flight,
  FlightsFetchSucceededAction,
  ADD_FLIGHT,
  AddFlightAction,
  FlightsFetchFailedAction,
  FLIGHTS_FETCH_FAILED,
  DeleteFlightAction,
  DELETE_FLIGHT,
  RESET_ERROR,
  ResetErrorAction,
  EditFlightAction,
  EDIT_FLIGHT,
} from "./types";

export const getFlights = (): FlightsFetchRequestedAction => {
  return { type: FLIGHTS_FETCH_REQUESTED };
};

export const flightsFetched = (
  flights: Flight[]
): FlightsFetchSucceededAction => {
  return { type: FLIGHTS_FETCH_SUCCEEDED, flights };
};

export const flightsFetchedFailed = (
  error: string
): FlightsFetchFailedAction => {
  return { type: FLIGHTS_FETCH_FAILED, error };
};

export const addFlight = (flight: Flight): AddFlightAction => {
  return { type: ADD_FLIGHT, flight };
};

export const editFlight = (
  newFlight: Flight,
  oldFlight: Flight
): EditFlightAction => {
  return { type: EDIT_FLIGHT, newFlight, oldFlight };
};

export const deleteFlight = (uuid: string): DeleteFlightAction => {
  return { type: DELETE_FLIGHT, uuid };
};

export const resetError = (): ResetErrorAction => {
  return { type: RESET_ERROR };
};
