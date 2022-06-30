import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMethodsApi,
  fetchCardNetworkApi,
  fetchIssuerBankApi,
} from "./api.js";
import {
  fetchMethodsSuccess,
  fetchMethodsError,
  fetchCardNetworkSuccess,
  fetchIssuerBankSuccess,
} from "./actions.js";
import { ActionConstants } from "./constants";

export function* fetchMethodsSaga(action) {
  try {
    const response = yield call(fetchMethodsApi, action.payload);
    if (
      response.responseBody.paymentMethods &&
      response.responseBody.paymentMethods.length
    ) {
      response.responseBody.paymentMethods.push("ALL");
      yield put(fetchMethodsSuccess(response.responseBody.paymentMethods));
    } else {
      yield put(fetchMethodsError());
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export function* fetchCardNetworkSaga(action) {
  try {
    console.log("inside card network");
    const response = yield call(fetchCardNetworkApi);
    if (
      response.responseBody.cardNetworks &&
      response.responseBody.cardNetworks.length
    ) {
      yield put(fetchCardNetworkSuccess(response.responseBody.cardNetworks));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export function* fetchIssuerBankSaga(action) {
  try {
    const response = yield call(fetchIssuerBankApi);
    if (
      response.responseBody.issuerBanks &&
      response.responseBody.issuerBanks.length
    ) {
      yield put(fetchIssuerBankSuccess(response.responseBody.issuerBanks));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export default function* rootSagaManger() {
  if (typeof window === "object") {
    yield takeLatest(ActionConstants.fetchMethodsRequest, fetchMethodsSaga);
    yield takeLatest(
      ActionConstants.fetchCardNetworkRequest,
      fetchCardNetworkSaga
    );
    yield takeLatest(
      ActionConstants.fetchIssuerBankRequest,
      fetchIssuerBankSaga
    );
  }
}
