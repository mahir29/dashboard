import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import {
  addRuleRequest,
  searchRulesRequest,
  updateRuleRequest,
} from "../../routes/rules/actions";
import { fetchPSPMerchantsWithIdRequest } from "../../routes/pspMerchants/actions";
import { mapToNumber, addProps } from "../../utils/helpers";
import {
  operandCategory1,
  operandCategory2,
  operandCategory3,
  operatorValues,
  paymentMethodCategory1,
  paymentMethodCategory2,
} from "../../utils/constants";
import {
  fetchIssuerBankRequest,
  fetchCardNetworkRequest,
} from "../../routes/core/actions";
import {ValueField} from "./ValueField";

const validationSchema = yup.object({
  name: yup.string("Name should be a string").required("Name is required"),
  description: yup
    .string("Description should be a string")
    .required("Description is required"),
  ruleConditions: yup
    .array()
    .of(
      yup.object().shape({
        operand: yup.string(),
        operator: yup.string(),
        value: yup.array(),
      })
    )
    .min(1, "Minimum one condition is required"),
  resultOptions: yup
    .array()
    .of(
      yup.object().shape({
        pspMerchantId: yup.string(),
        trafficPercentage: yup.number(),
        fallbackPspMerchantId: yup.string(),
      })
    )
    .min(1, "Minimum one option is required")
    .test(
      "sum",
      "Total Sum of Traffic Percentage must be 100",
      (resultOptions = []) => {
        const total = resultOptions.reduce((total, resultOption) => {
          return total + (resultOption.trafficPercentage || 0);
        }, 0);

        return total === 100;
      }
    ),
});

const RuleForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pspMerchants = useSelector((state) => state.pspMerchants);
  const rules = useSelector((state) => state.rules);
  const { cardNetworks } = useSelector((state) => state.cardNetworks);
  const { issuerBanks } = useSelector((state) => state.issuerBanks);
  const { rule, merchant, method } = location.state;
  const menu = paymentMethodCategory1.includes(method)
    ? operandCategory1
    : paymentMethodCategory2.includes(method)
    ? operandCategory2
    : operandCategory3;

  useEffect(() => {
    dispatch(fetchPSPMerchantsWithIdRequest(merchant));
    dispatch(searchRulesRequest({ method, merchant }));
    dispatch(fetchCardNetworkRequest());
    dispatch(fetchIssuerBankRequest());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: rule?.name || "",
          description: rule?.description || "",
          priority: rule?.priority || rules.rules?.length + 1,
          paymentMethod: rule?.paymentMethod || method,
          merchant: rule?.merchant || merchant,
          ruleConditions: rule?.ruleConditions || [],
          resultOptions: rule?.resultOptions || [],
        }}
        onSubmit={(values) => {
          const temp = addProps(mapToNumber(values));
          rule
            ? dispatch(updateRuleRequest({ id: rule.id, data: temp }))
            : dispatch(addRuleRequest(temp));
          navigate("/rules");
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Paper
                sx={{
                  padding: 4,
                  margin: "3rem auto",
                  maxWidth: "60rem",
                  borderRadius: "2%",
                }}
                square
                elevation={4}
              >
                <Grid container gap="1.1rem">
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="name"
                    name="name"
                    label="NAME"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.name && touched.name ? (
                    <Typography sx={{ color: "red", marginTop: "-0.6rem" }}>
                      *{errors.name}
                    </Typography>
                  ) : null}
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="description"
                    name="description"
                    label="DESCRIPTION"
                    type="description"
                    onChange={handleChange}
                    value={values.description}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.description && touched.description ? (
                    <Typography sx={{ color: "red", marginTop: "-0.6rem" }}>
                      *{errors.description}
                    </Typography>
                  ) : null}
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="merchant"
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="merchant"
                    label="MERCHANT"
                    type="merchant"
                    onChange={handleChange}
                    value={values.merchant}
                    onBlur={handleBlur}
                    disabled
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{ backgroundColor: "whitesmoke" }}
                    id="paymentMethod"
                    name="paymentMethod"
                    label="PAYMENT METHOD"
                    type="paymentMethod"
                    onChange={handleChange}
                    value={values.paymentMethod}
                    onBlur={handleBlur}
                    disabled
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="priority"
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="priority"
                    label="PRIORITY"
                    onChange={handleChange}
                    value={values.priority}
                    disabled
                  />
                  <Typography sx={{ color: "#007a6f" }}>CONDITIONS</Typography>
                  <FieldArray
                    name="ruleConditions"
                    render={(arrayHelpers) => (
                      <div>
                        {values.ruleConditions.map((condition, index) => (
                          <div key={index}>
                            <Grid
                              container
                              flex-direction="column"
                              gap="0.5rem"
                              sx={{ mb: "0.5rem" }}
                            >
                              <Grid item xs={2.5}>
                                <Autocomplete
                                  disableClearable
                                  size="small"
                                  value={
                                    values.ruleConditions[index].operand || null
                                  }
                                  id={`ruleConditions[${index}].operand`}
                                  isOptionEqualToValue={(option, value) =>
                                    option === value
                                  }
                                  options={menu}
                                  onChange={(e, v) => {
                                    setFieldValue(
                                      `ruleConditions[${index}].operand`,
                                      v
                                    );
                                  }}
                                  getOptionLabel={(option) => option}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Operand"
                                      required
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={2.5}>
                                <Autocomplete
                                  disableClearable
                                  size="small"
                                  value={
                                    values.ruleConditions[index].operator ||
                                    null
                                  }
                                  id={`ruleConditions[${index}].operator`}
                                  isOptionEqualToValue={(option, value) =>
                                    option === value
                                  }
                                  options={operatorValues}
                                  onChange={(e, v) => {
                                    setFieldValue(
                                      `ruleConditions[${index}].operator`,
                                      v
                                    );
                                  }}
                                  getOptionLabel={(option) => option}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Operator"
                                      required
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                {cardNetworks && issuerBanks && (
                                  <ValueField
                                    name={`ruleConditions.${index}.value`}
                                    condition={condition}
                                    setFieldValue={setFieldValue}
                                    it={index}
                                    handleChange={handleChange}
                                    values={values}
                                    cardNetworks={cardNetworks}
                                    issuerBanks={issuerBanks}
                                  />
                                )}
                              </Grid>
                              <Grid item xs={3}>
                                <Button
                                  variant="outlined"
                                  startIcon={<RemoveIcon />}
                                  onClick={() => arrayHelpers.remove(index)} // remove a condition from the list
                                >
                                  REMOVE CONDITION
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() =>
                            arrayHelpers.push({
                              operator: "",
                              operand: "",
                              value: [""],
                            })
                          }
                          sx={{ mb: "1rem" }}
                        >
                          ADD CONDITION
                        </Button>
                        <Typography sx={{ color: "#007a6f" }}>
                          RESULT OPTIONS
                        </Typography>
                        <FieldArray
                          name="resultOptions"
                          render={(arrayHelpers) => (
                            <div>
                              {values.resultOptions.map((friend, index) => (
                                <div key={index}>
                                  <Grid
                                    container
                                    gap="0.5rem"
                                    sx={{ mt: "1rem" }}
                                  >
                                    <Autocomplete
                                      disableClearable
                                      size="small"
                                      value={
                                        values.resultOptions[index]
                                          .pspMerchantId || null
                                      }
                                      id={`resultOptions[${index}].pspMerchantId`}
                                      isOptionEqualToValue={(option, value) =>
                                        option === value
                                      }
                                      options={
                                        pspMerchants.pspMerchants
                                          ? pspMerchants.pspMerchants
                                          : []
                                      }
                                      onChange={(e, v) => {
                                        setFieldValue(
                                          `resultOptions[${index}].pspMerchantId`,
                                          v
                                        );
                                      }}
                                      getOptionLabel={(option) => option}
                                      sx={{ minWidth: 220 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="pspMerchantId"
                                          required
                                        />
                                      )}
                                    />
                                    <TextField
                                      variant="outlined"
                                      type="number"
                                      label="Traffic Percentage"
                                      name={`resultOptions[${index}].trafficPercentage`}
                                      onChange={handleChange}
                                      size="small"
                                      value={
                                        values.resultOptions[index]
                                          .trafficPercentage
                                      }
                                      inputProps={{ min: 0, max: 100 }}
                                      sx={{ width: "15rem" }}
                                    />
                                    <Autocomplete
                                      disableClearable
                                      size="small"
                                      value={
                                        values.resultOptions[index]
                                          .fallbackPspMerchantId || null
                                      }
                                      id={`resultOptions[${index}].fallbackPspMerchantId`}
                                      isOptionEqualToValue={(option, value) =>
                                        option === value
                                      }
                                      options={
                                        pspMerchants.pspMerchants
                                          ? pspMerchants.pspMerchants
                                          : []
                                      }
                                      onChange={(e, v) => {
                                        setFieldValue(
                                          `resultOptions[${index}].fallbackPspMerchantId`,
                                          v
                                        );
                                      }}
                                      getOptionLabel={(option) => option}
                                      sx={{ minWidth: 220 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="FallbackPspMerchantId"
                                        />
                                      )}
                                    />
                                    <Button
                                      variant="outlined"
                                      startIcon={<RemoveIcon />}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      DELETE OPTION
                                    </Button>
                                  </Grid>
                                </div>
                              ))}
                              {errors.resultOptions && touched.resultOptions ? (
                                <Typography
                                  sx={{
                                    color: "red",
                                  }}
                                >
                                  *{errors.resultOptions}
                                </Typography>
                              ) : null}
                              <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() =>
                                  arrayHelpers.push({
                                    pspMerchantId: "",
                                    trafficPercentage: 0,
                                    fallbackPspMerchantId: "",
                                  })
                                }
                                sx={{ mb: "1rem", mt: "1rem " }}
                              >
                                ADD RESULT OPTION
                              </Button>
                            </div>
                          )}
                        />
                        <Stack gap={88} direction="row">
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "#007a6f" }}
                          >
                            {rule ? "UPDATE" : "SUBMIT"}
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#007a6f" }}
                            onClick={() => navigate("/rules")}
                          >
                            GO BACK
                          </Button>
                        </Stack>
                      </div>
                    )}
                  />
                </Grid>
              </Paper>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default RuleForm;
