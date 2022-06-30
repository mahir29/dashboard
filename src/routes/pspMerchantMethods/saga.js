import { call ,put, takeLatest} from "redux-saga/effects";
import { fetchPSPMerchantMethodsApi } from './api.js';
import { fetchPSPMerchantMethodsSuccess,fetchPSPMerchantMethodsError } from './actions.js';
import { ActionConstants } from "./constants";


export function* fetchPSPMerchantMethodsSaga(action){
    try{
        const response=yield call(fetchPSPMerchantMethodsApi);
        if(response?.responseBody?.data?.length){
            yield put(fetchPSPMerchantMethodsSuccess(response.responseBody.data))
        }
        else{
            yield put(fetchPSPMerchantMethodsError());
        }
    }
    catch(error){
        throw new Error('Something went wrong');
    }
}

export default function* rootSagaManger(){
    if(typeof window==='object'){
        yield takeLatest(ActionConstants.fetchPSPMerchantMethodsRequest,fetchPSPMerchantMethodsSaga);
    }
}