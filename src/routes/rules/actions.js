import { ActionConstants } from "./constants";

export function fetchRulesRequest(payload) {
  return {
    type: ActionConstants.fetchRulesRequest,
    payload,
  };
}

export function fetchRulesSuccess(payload) {
  return {
    type: ActionConstants.fetchRulesSuccess,
    payload,
  };
}

export function addRuleRequest(payload) {
  return {
    type: ActionConstants.addRuleRequest,
    payload,
  };
}

export function deleteRuleRequest(payload) {
  return {
    type: ActionConstants.deleteRuleRequest,
    payload,
  };
}

export function searchRulesRequest(payload) {
  return {
    type: ActionConstants.searchRulesRequest,
    payload,
  };
}

export function searchRulesSuccess(payload) {
  return {
    type: ActionConstants.searchRulesSuccess,
    payload,
  };
}

export function updateRuleRequest(payload) {
  return {
    type: ActionConstants.updateRuleRequest,
    payload,
  };
}

export function changeOrderRequest(payload) {
  return {
    type: ActionConstants.changeOrderRequest,
    payload,
  };
}

export function changeActivityRequest(payload){
  return{
    type:ActionConstants.changeActivityRequest,
    payload,
  }
}

export function fetchInactiveRules(payload){
  return{
    type:ActionConstants.fetchInactiveRules,
    payload,
  }
}

export function fetchInactiveRulesSuccess(payload){
  return{
    type:ActionConstants.fetchInactiveRulesSuccess,
    payload,
  }
}