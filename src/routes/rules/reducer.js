import { ActionConstants } from "./constants";

const initialState = {
  rules: null,
  isLoading: true,
  error: false,
};

export const rulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.fetchRulesRequest:
      return { ...state, isLoading: true };
    case ActionConstants.fetchRulesSuccess:
      return { ...state, isLoading: false, rules: action.payload };
    case ActionConstants.fetchRulesError: {
      return { ...state, isLoading: false, rules: [], error: true };
    }
    case ActionConstants.addRuleRequest: {
      return { ...state, isLoading: true, rules: [] };
    }
    case ActionConstants.searchRulesSuccess: {
      return { ...state, isLoading: false, rules: action.payload };
    }
    case ActionConstants.fetchInactiveRulesSuccess: {
      return { ...state, isLoading: false, rules: action.payload };
    }
    default:
      return state;
  }
};
