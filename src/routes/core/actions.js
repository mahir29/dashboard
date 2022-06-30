import { ActionConstants } from "./constants";

export function fetchMethodsSuccess(payload){
    return{
        type:ActionConstants.fetchMethodsSuccess,
        payload
    }
};

export function fetchMethodsRequest(payload){
    return{
        type:ActionConstants.fetchMethodsRequest,
        payload
    }
}

export function fetchMethodsError(payload){
    return{
        type:ActionConstants.fetchMethodsError,
        payload
    }
}

export function fetchIssuerBankSuccess(payload){
    return{
        type:ActionConstants.fetchIssuerBankSuccess,
        payload
    }
};

export function fetchIssuerBankRequest(payload){
    return{
        type:ActionConstants.fetchIssuerBankRequest,
        payload
    }
}

export function fetchCardNetworkSuccess(payload){
    return{
        type:ActionConstants.fetchCardNetworkSuccess,
        payload
    }
};

export function fetchCardNetworkRequest(payload){
    return{
        type:ActionConstants.fetchCardNetworkRequest,
        payload
    }
}