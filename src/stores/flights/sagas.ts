import { call, put, all, takeLatest } from "redux-saga/effects";
import { fetchCheapFlights, fetchBusinessFlights } from "../../api/flights";
import { flightsFetched, flightsFetchedFailed } from "./actions";
import { FLIGHTS_FETCH_REQUESTED } from "./types";

function* fetchFlights(): any {
  try {
    const [cheapFlights, businessFlights] = yield all([
      call(fetchCheapFlights),
      call(fetchBusinessFlights),
    ]);

    yield put(flightsFetched([...cheapFlights, ...businessFlights]));
  } catch (error) {
    yield put(flightsFetchedFailed(error.message));
  }
}

function* flightsSaga() {
  yield takeLatest(FLIGHTS_FETCH_REQUESTED, fetchFlights);
}

export default flightsSaga;
