import { ActionConstants } from "./constants";

const initialState = {
  pspMerchants: null,
  isLoading: null,
  error: false,
};

export const pspMerchantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.fetchPSPMerchantsRequest:
      return { ...state, isLoading: true };
    case ActionConstants.fetchPSPMerchantsSuccess:
      return { ...state, isLoading: false, pspMerchants: action.payload };
    case ActionConstants.fetchPSPMerchantsWithIdSuccess:
      return { ...state, isLoading: false, pspMerchants: action.payload };
    case ActionConstants.fetchPSPMerchantsError: {
      return { ...state, isLoading: false, pspMerchants: [], error: true };
    }
    default:
      return state;
  }
};
