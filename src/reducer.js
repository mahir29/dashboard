import { combineReducers } from "redux";
import { merchantsReducer } from "./routes/merchants/reducer";
import {
  methodsReducer,
  cardNetworkReducer,
  issuerBankReducer,
} from "./routes/core/reducer";
import { pspMerchantMethodsReducer } from "./routes/pspMerchantMethods/reducer";
import { pspMerchantsReducer } from "./routes/pspMerchants/reducer";
import { rulesReducer } from "./routes/rules/reducer";
import { notifReducer } from "./utils/alert";

// right now we have only 1 reducer, but lets use this format of combineReducers so you can add more later if you need to.
const rootReducer = combineReducers({
  merchants: merchantsReducer,
  methods: methodsReducer,
  cardNetworks: cardNetworkReducer,
  issuerBanks: issuerBankReducer,
  pspMerchants: pspMerchantsReducer,
  pspMerchantMethods: pspMerchantMethodsReducer,
  rules: rulesReducer,
  notif: notifReducer,
});

export default rootReducer;
