
import { ActionConstants } from './constants';

const initialState = {
  pspMerchantMethods: null,
  isLoading: null,
  error: false,
}

export const pspMerchantMethodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.fetchPSPMerchantMethodsRequest:
      return {...state, isLoading: true};
      case ActionConstants.fetchPSPMerchantMethodsSuccess: 
      return {...state, isLoading: false, pspMerchantMethods: action.payload};
      case ActionConstants.fetchPSPMerchantMethodsError:
        {
          return {...state, isLoading: false, pspMerchantMethods: [], error: true}
        }
    default:
      return state
  }
}