import { ActionConstants } from "./constants";

export function fetchPSPMerchantsSuccess(payload){
    return{
        type:ActionConstants.fetchPSPMerchantsSuccess,
        payload
    }
};

export function fetchPSPMerchantsRequest(payload){
    return{
        type:ActionConstants.fetchPSPMerchantsRequest,
        payload
    }
}

export function fetchPSPMerchantsError(payload){
    return{
        type:ActionConstants.fetchPSPMerchantsError,
        payload
    }
}

export function fetchPSPMerchantsWithIdRequest(payload){
    return{
        type:ActionConstants.fetchPSPMerchantsWithIdRequest,
        payload
    }
}

export function fetchPSPMerchantsWithIdSuccess(payload){
    return{
        type:ActionConstants.fetchPSPMerchantsWithIdSuccess,
        payload
    }
}