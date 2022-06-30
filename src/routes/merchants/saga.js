import { call ,put, takeLatest} from "redux-saga/effects";
import { fetchMerchantsApi } from './api.js';
import { fetchMerchantsSuccess,fetchMerchantsError } from './actions.js';
import { ActionConstants } from "./constants";


export function* fetchMerchantsSaga(action){
    try{
        const response=yield call(fetchMerchantsApi);
        if(response?.responseBody?.data?.length){
            yield put(fetchMerchantsSuccess(response.responseBody.data))
        }
        else{
            yield put(fetchMerchantsError());
        }
    }
    catch(error){
        throw new Error('Something went wrong');
    }
}

export default function* rootSagaManger(){
    if(typeof window==='object'){
        yield takeLatest(ActionConstants.fetchMerchantsRequest,fetchMerchantsSaga);
    }
}