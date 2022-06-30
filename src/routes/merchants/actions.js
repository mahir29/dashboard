import { ActionConstants } from "./constants";

export function fetchMerchantsSuccess(payload){
    return{
        type:ActionConstants.fetchMerchantsSuccess,
        payload
    }
};

export function fetchMerchantsRequest(payload){
    return{
        type:ActionConstants.fetchMerchantsRequest,
        payload
    }
}

export function fetchMerchantsError(payload){
    return{
        type:ActionConstants.fetchMerchantsError,
        payload
    }
}