import { call, put, takeLatest } from "redux-saga/effects";
import { fetchPSPMerchantsApi, fetchPSPMerchantsWithIdApi } from "./api.js";
import {
  fetchPSPMerchantsSuccess,
  fetchPSPMerchantsError,
  fetchPSPMerchantsWithIdSuccess,
} from "./actions.js";
import { ActionConstants } from "./constants";

export function* fetchPSPMerchantsSaga(action) {
  try {
    const response = yield call(fetchPSPMerchantsApi);
    if (response?.responseBody?.data?.length) {
      yield put(fetchPSPMerchantsSuccess(response.responseBody.data));
    } else {
      yield put(fetchPSPMerchantsError());
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export function* fetchPSPMerchantsWithIdSaga(action) {
  try {
    const response = yield call(fetchPSPMerchantsWithIdApi, action.payload);
    if (response?.responseBody?.pspMerchants?.length) {
      yield put(
        fetchPSPMerchantsWithIdSuccess(response.responseBody.pspMerchants)
      );
    } else {
      yield put(fetchPSPMerchantsError());
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export default function* rootSagaManger() {
  if (typeof window === "object") {
    yield takeLatest(
      ActionConstants.fetchPSPMerchantsRequest,
      fetchPSPMerchantsSaga
    );
    yield takeLatest(
      ActionConstants.fetchPSPMerchantsWithIdRequest,
      fetchPSPMerchantsWithIdSaga
    );
  }
}
