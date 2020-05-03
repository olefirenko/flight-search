import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Flight, FlightType } from "../stores/flights/types";

const CHEAP_FLIGHTS_URL = "//www.mocky.io/v2/5eabf752330000a215dfe14c";
const BUSINESS_FLIGHTS_URL = "//www.mocky.io/v2/5eabf84d3300009222dfe15a";

type CheapFlightResponse = {
  route: string;
  departure: number;
  arrival: number;
};

type BusinessFlightResponse = {
  departure: string;
  arrival: string;
  departureTime: number;
  arrivalTime: number;
};

export const fetchCheapFlights = async (): Promise<Flight[]> => {
  const { data } = await axios.get<{ data: CheapFlightResponse[] }>(
    CHEAP_FLIGHTS_URL
  );

  return data.data.map((flight) => {
    const [arrival, departure] = flight.route.split("-");

    return {
      uuid: uuidv4(),
      departure,
      arrival,
      departureTime: new Date(flight.departure * 1000),
      arrivalTime: new Date(flight.arrival * 1000),
      flightType: FlightType.CHEAP,
    };
  });
};

export const fetchBusinessFlights = async (): Promise<Flight[]> => {
  const { data } = await axios.get<{ data: BusinessFlightResponse[] }>(
    BUSINESS_FLIGHTS_URL
  );

  return data.data.map((flight) => {
    return {
      uuid: uuidv4(),
      departure: flight.departure,
      arrival: flight.arrival,
      departureTime: new Date(flight.departureTime * 1000),
      arrivalTime: new Date(flight.arrivalTime * 1000),
      flightType: FlightType.BUSINESS,
    };
  });
};
