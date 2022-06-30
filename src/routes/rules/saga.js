import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchRulesApi,
  addRuleApi,
  deleteRuleApi,
  searchRulesApi,
  updateRuleApi,
  changeOrderApi,
  changeActivityApi,
  inactiveRulesApi,
} from "./api.js";
import {
  fetchRulesSuccess,
  searchRulesRequest,
  searchRulesSuccess,
  fetchInactiveRulesSuccess,
  fetchInactiveRules,
} from "./actions.js";
import { ActionConstants } from "./constants.js";
import { notifRequestOpen } from "../../utils/alert.js";

export function* fetchRulesSaga(action) {
  try {
    console.log("inside saga");
    const response = yield call(fetchRulesApi);
    if (response?.responseBody?.length && response.statusCode === 201) {
      yield put(fetchRulesSuccess(response.responseBody));
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "No rules added yet",
          type: "success",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* addRuleSaga(action) {
  try {
    console.log("inside add rule saga");
    const response = yield call(addRuleApi, action.payload);
    const method = action.payload.paymentMethod;
    const merchant = action.payload.merchant;
    if (response && response.statusCode === 201) {
      yield put(searchRulesRequest({ merchant, method }));
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Rule Added Successfully !",
          type: "success",
        })
      );
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* searchRulesSaga(action) {
  try {
    console.log("inside search rule saga");
    const response = yield call(searchRulesApi, action.payload);
    if (response && response.statusCode === 201) {
      yield put(searchRulesSuccess(response.responseBody));
      if (response?.responseBody?.length === 0) {
        yield put(
          notifRequestOpen({
            isOpen: true,
            message: "No Rules Added Yet",
            type: "success",
          })
        );
      }
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* deleteRuleSaga(action) {
  try {
    console.log("inside delete rule saga");
    const id = action.payload.id;
    const merchant = action.payload.merchant;
    const method = action.payload.method;
    const response = yield call(deleteRuleApi, id);
    if (response && response.statusCode === 201) {
      yield put(searchRulesRequest({ merchant, method }));
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Rule Deleted Successfully !",
          type: "success",
        })
      );
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* updateRuleSaga(action) {
  try {
    console.log("inside update rule saga");
    const response = yield call(updateRuleApi, action.payload);
    if (response && response.statusCode === 201) {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Rule Updated Successfully !",
          type: "success",
        })
      );
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* changeOrderSaga(action) {
  try {
    console.log("inside change order saga");
    const response = yield call(changeOrderApi, action.payload);
    if (response && response.statusCode === 201) {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Priority Order Changed Successfully",
          type: "success",
        })
      );
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* changeActivitySaga(action) {
  try {
    console.log("inside activity saga");
    const id = action.payload.id;
    const activity = action.payload.activity;
    const merchant = action.payload.merchant;
    const method = action.payload.method;
    const response = yield call(changeActivityApi, { id, activity });
    if (response && response.statusCode === 201) {
      if (activity) yield put(fetchInactiveRules({ merchant, method }));
      else yield put(searchRulesRequest({ merchant, method }));
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Activity Status Changed Successfully",
          type: "success",
        })
      );
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export function* fetchInactiveRulesSaga(action) {
  try {
    console.log("inside saga");
    const response = yield call(inactiveRulesApi, action.payload);
    if (response?.responseBody && response.statusCode === 201) {
      console.log("response: ", response.responseBody);
      yield put(fetchInactiveRulesSuccess(response.responseBody));
      if (response.responseBody.length === 0) {
        yield put(
          notifRequestOpen({
            isOpen: true,
            message: "No Inactive Rules",
            type: "success",
          })
        );
      }
    } else {
      yield put(
        notifRequestOpen({
          isOpen: true,
          message: "Server Error",
          type: "error",
        })
      );
    }
  } catch (err) {
    yield put(
      notifRequestOpen({ isOpen: true, message: "Server Error", type: "error" })
    );
  }
}

export default function* rootSagaManger() {
  yield takeLatest(ActionConstants.fetchRulesRequest, fetchRulesSaga);
  yield takeLatest(ActionConstants.addRuleRequest, addRuleSaga);
  yield takeLatest(ActionConstants.deleteRuleRequest, deleteRuleSaga);
  yield takeLatest(ActionConstants.searchRulesRequest, searchRulesSaga);
  yield takeLatest(ActionConstants.updateRuleRequest, updateRuleSaga);
  yield takeLatest(ActionConstants.changeOrderRequest, changeOrderSaga);
  yield takeLatest(ActionConstants.changeActivityRequest, changeActivitySaga);
  yield takeLatest(ActionConstants.fetchInactiveRules, fetchInactiveRulesSaga);
}
