import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store.js";
import Merchants from "./routes/merchants/Merchants";
import Rules from "./routes/rules/Rules";
import PSPMerchantMethods from "./routes/pspMerchantMethods/pspMerchantMethods";
import PSPMerchants from "./routes/pspMerchants/pspMerchants";
import RuleForm from "./components/Rules/RuleForm";
import MiniDrawer from "./components/Wrapper/SideBarComponent";
import { DrawerHeader } from "./utils/helpers";
import InactiveRuleTable from "./components/Rules/InactiveRuleTable.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MiniDrawer />
        <DrawerHeader />
        <Routes>
          <Route path="/ruleForm" element={<RuleForm />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/pspMerchants" element={<PSPMerchants />} />
          <Route path="/pspMerchantMethods" element={<PSPMerchantMethods />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/inactiveRules" element={<InactiveRuleTable />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
