
import { ActionConstants } from './constants';

const initialState = {
  merchants: null,
  isLoading: null,
  error: false,
}

export const merchantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.fetchMerchantsRequest:
      return {...state, isLoading: true};
      case ActionConstants.fetchMerchantsSuccess: 
      return {...state, isLoading: false, merchants: action.payload};
      case ActionConstants.fetchMerchantsError:
        {
          return {...state, isLoading: false, merchants: [], error: true}
        }
    default:
      return state
  }
}