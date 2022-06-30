import { ActionConstants } from "./constants";

export function fetchPSPMerchantMethodsSuccess(payload){
    return{
        type:ActionConstants.fetchPSPMerchantMethodsSuccess,
        payload
    }
};

export function fetchPSPMerchantMethodsRequest(payload){
    return{
        type:ActionConstants.fetchPSPMerchantMethodsRequest,
        payload
    }
}

export function fetchPSPMerchantMethodsError(payload){
    return{
        type:ActionConstants.fetchPSPMerchantMethodsError,
        payload
    }
}