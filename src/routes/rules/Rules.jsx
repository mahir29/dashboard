import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RuleTable from "../../components/Rules/RuleTable";
import { useDispatch, useSelector } from "react-redux";
import { searchRulesRequest } from "./actions";
import { useNavigate } from "react-router-dom";
import { fetchMerchantsRequest } from "../merchants/actions";
import { fetchMethodsRequest } from "../core/actions";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import GetAllRuleTable from "../../components/Rules/GetAllRules";

export default function Rules() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState("DEMOCCDC");
  const [method, setMethod] = useState("");
  const merchants = useSelector((state) => state.merchants);
  const rules = useSelector((state) => state.rules);
  const methods = useSelector((state) => state.methods);
  const rule = null;
  const data = JSON.parse(window.localStorage.getItem("CATEGORY"));

  useEffect(() => {
    if (data) {
      setMerchant(data.merchant);
      setMethod(data.method);
    }
    dispatch(fetchMerchantsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchMethodsRequest(merchant));
    // eslint-disable-next-line
  }, [merchant]);

  useEffect(() => {
    if (!methods.isLoading) {
      if (!methods.methods) setMethod(data.method);
      else if (methods.methods.includes(data.method)) {
        setMethod(data.method);
      } else {
        setMethod("ALL");
      }
    }
    // eslint-disable-next-line
  }, [methods]);

  useEffect(() => {
    window.localStorage.setItem(
      "CATEGORY",
      JSON.stringify({
        merchant: merchant,
        method: method,
      })
    );
    if (merchant && method) dispatch(searchRulesRequest({ merchant, method }));
    // eslint-disable-next-line
  }, [method, merchant]);

  const handleAdd = () => {
    navigate("/ruleForm", { state: { rule, merchant, method } });
  };

  const handleInactivity = () => {
    navigate("/inactiveRules", { state: { merchant, method } });
  };

  if (merchants.merchants)
    return (
      <>
        <Box
          sx={{
            flexGrow: 100,
            p: 3,
            marginLeft: 8,
            minWidth: 120,
            display: "flex",
          }}
        >
          <Autocomplete
            disableClearable
            size="small"
            value={data.merchant ? { id: data.merchant } : null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={merchants.merchants ? merchants.merchants : []}
            getOptionLabel={(option) => option.id}
            sx={{ m: 1, minWidth: 200 }}
            onChange={(event, val) => {
              window.localStorage.setItem(
                "CATEGORY",
                JSON.stringify({
                  merchant: val.id,
                  method: method,
                })
              );
              setMerchant(val.id);
            }}
            renderInput={(params) => <TextField {...params} label="Merchant" />}
          />
          <Autocomplete
            disableClearable
            size="small"
            options={methods.methods ? methods.methods : []}
            value={data.method ? data.method : null}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            sx={{ m: 1, minWidth: 200 }}
            onChange={(event, val) => {
              setMethod(val);
            }}
            renderInput={(params) => {
              return <TextField label="Payment Method" {...params} />;
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: "2.4rem",
              width: "11rem",
              backgroundColor: "#007a6f",
              marginLeft: "0.8rem",
              marginTop: "0.5rem",
            }}
            onClick={handleAdd}
            disabled={method === "ALL"}
          >
            ADD NEW RULE
          </Button>
          <Button
            variant="contained"
            startIcon={<AutoDeleteIcon />}
            sx={{
              height: "2.4rem",
              width: "12rem",
              backgroundColor: "#007a6f",
              marginLeft: "0.8rem",
              marginTop: "0.5rem",
            }}
            onClick={handleInactivity}
            disabled={method === "ALL"}
          >
            INACTIVE RULES
          </Button>
        </Box>
        {method !== "ALL" && (
          <Box sx={{ flexGrow: 100, p: 3, marginLeft: 9, marginTop: -3 }}>
            {rules.rules && (
              <RuleTable
                rule={rules.rules}
                merchant={merchant}
                method={method}
              />
            )}
          </Box>
        )}
        {method === "ALL" && rules.rules && (
          <GetAllRuleTable merchant={merchant} method={method} />
        )}
      </>
    );
  return null;
}
