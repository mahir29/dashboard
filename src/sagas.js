import { all, fork } from "redux-saga/effects";
import MerchantsSaga from "./routes/merchants/saga";
import CoreSaga from "./routes/core/saga";
import PSPMerchantMethodsSaga from "./routes/pspMerchantMethods/saga";
import PSPMerchantsSaga from "./routes/pspMerchants/saga";
import RulesSaga from "./routes/rules/saga";

export default function* rootSaga() {
  yield all([
    fork(MerchantsSaga),
    fork(CoreSaga),
    fork(PSPMerchantsSaga),
    fork(PSPMerchantMethodsSaga),
    fork(RulesSaga),
  ]);
}
