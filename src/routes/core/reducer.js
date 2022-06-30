import { ActionConstants } from "./constants";

const initialState = {
  methods: null,
  isLoading: null,
  error: false,
};

export const methodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.fetchMethodsRequest:
      return { ...state, isLoading: true };
    case ActionConstants.fetchMethodsSuccess:
      return { ...state, isLoading: false, methods: action.payload };
    case ActionConstants.fetchMethodsError: {
      return { ...state, isLoading: false, methods: [], error: true };
    }
    default:
      return state;
  }
};

export const cardNetworkReducer = (state = { cardNetworks: null }, action) => {
  switch (action.type) {
    case ActionConstants.fetchCardNetworkSuccess:
      return { ...state, cardNetworks: action.payload };
    default:
      return state;
  }
};

export const issuerBankReducer = (state = { issuerBanks: null }, action) => {
  switch (action.type) {
    case ActionConstants.fetchIssuerBankSuccess:
      return { ...state, issuerBanks: action.payload };
    default:
      return state;
  }
};
