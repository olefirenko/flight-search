import {
  FlightState,
  FLIGHTS_FETCH_REQUESTED,
  FlightsAction,
  FLIGHTS_FETCH_SUCCEEDED,
  ADD_FLIGHT,
  FLIGHTS_FETCH_FAILED,
  DELETE_FLIGHT,
  RESET_ERROR,
  EDIT_FLIGHT,
} from "./types";
import { produce } from "immer";

const initialState: FlightState = {
  flights: [],
  isFetching: false,
  fetched: false,
  error: null,
};

export const flightsStore = (
  state = initialState,
  action: FlightsAction
): FlightState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FLIGHTS_FETCH_REQUESTED:
        draft.isFetching = true;
        break;

      case FLIGHTS_FETCH_SUCCEEDED:
        draft.flights = action.flights;
        draft.error = null;
        draft.isFetching = false;
        draft.fetched = true;
        break;

      case FLIGHTS_FETCH_FAILED:
        draft.error = action.error;
        draft.isFetching = false;
        draft.fetched = false;
        break;

      case ADD_FLIGHT:
        draft.flights.push(action.flight);
        break;

      case EDIT_FLIGHT:
        let flight = draft.flights.find(
          (item) => item.uuid === action.oldFlight.uuid
        );
        !flight ||
          (draft.flights[draft.flights.indexOf(flight)] = action.newFlight);
        break;

      case DELETE_FLIGHT:
        draft.flights = draft.flights.filter(
          (flight) => flight.uuid !== action.uuid
        );
        break;

      case RESET_ERROR:
        draft.error = null;
        break;
    }
  });
};
