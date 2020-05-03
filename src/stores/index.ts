import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import { flightsStore } from "./flights/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import flightsSaga from "./flights/sagas";

const rootReducer = combineReducers({
  flightsStore
});

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(middleWareEnhancer, persistState() as any)
);

sagaMiddleware.run(flightsSaga)

export type RootState = ReturnType<typeof rootReducer>;