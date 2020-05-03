export const FLIGHTS_FETCH_REQUESTED = "FLIGHTS_FETCH_REQUESTED";
export const FLIGHTS_FETCH_SUCCEEDED = "FLIGHTS_FETCH_SUCCEEDED";
export const FLIGHTS_FETCH_FAILED = "FLIGHTS_FETCH_FAILED";
export const RESET_ERROR = "RESET_ERROR";
export const EDIT_FLIGHT = "EDIT_FLIGHT";
export const ADD_FLIGHT = "ADD_FLIGHT";
export const DELETE_FLIGHT = "DELETE_FLIGHT";

export enum FlightType {
  CHEAP = "Cheap",
  BUSINESS = "Business",
}

export interface Flight {
  uuid: string;
  departure: string;
  arrival: string;
  departureTime: Date;
  arrivalTime: Date;
  flightType: FlightType;
}

export interface FlightState {
  flights: Flight[];
  isFetching: boolean;
  fetched: boolean;
  error: string | null;
}

export interface FlightsFetchRequestedAction {
  type: typeof FLIGHTS_FETCH_REQUESTED;
}

export interface FlightsFetchSucceededAction {
  type: typeof FLIGHTS_FETCH_SUCCEEDED;
  flights: Flight[];
}

export interface FlightsFetchFailedAction {
  type: typeof FLIGHTS_FETCH_FAILED;
  error: string;
}

export interface AddFlightAction {
  type: typeof ADD_FLIGHT;
  flight: Flight;
}

export interface EditFlightAction {
  type: typeof EDIT_FLIGHT;
  newFlight: Flight;
  oldFlight: Flight;
}

export interface DeleteFlightAction {
  type: typeof DELETE_FLIGHT;
  uuid: string;
}

export interface ResetErrorAction {
  type: typeof RESET_ERROR;
}

export type FlightsAction =
  | FlightsFetchRequestedAction
  | FlightsFetchSucceededAction
  | FlightsFetchFailedAction
  | AddFlightAction
  | EditFlightAction
  | DeleteFlightAction
  | ResetErrorAction;
