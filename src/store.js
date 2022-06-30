import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas.js";
import reducer from "./reducer.js";

// we need an initialState otherwise , store will freak out
const initialState = {
  merchants: {},
  methods: {},
  cardNetworks: {},
  issuerBanks: {},
  pspMerchants: {},
  pspMerchantMethods: {},
  rules: {},
  notif: {},
};

// redux sagas is a middleware that we apply to the store
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);

export const store = createStore(
  reducer,
  initialState,
  enhancer
  // applyMiddleware(sagaMiddleware,)
);
sagaMiddleware.run(rootSaga);

export default store;
