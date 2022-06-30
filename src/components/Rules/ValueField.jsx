import React from "react";
import { FieldArray } from "formik";
import { Grid, TextField, Autocomplete, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { cardSubTypes } from "../../utils/constants";

export const ValueField = ({
  condition,
  name,
  setFieldValue,
  it,
  handleChange,
  values,
  cardNetworks,
  issuerBanks,
}) => {
  const list =
    values.ruleConditions[it].operand === "CARD_NETWORK"
      ? cardNetworks
      : values.ruleConditions[it].operand === "CARD_SUB_TYPE"
      ? cardSubTypes
      : issuerBanks;
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {condition.value.length > 0 ? (
            condition.value.map((item, index) => (
              <div key={index}>
                <Grid container flex-direction="column" sx={{ mb: "0.5rem" }}>
                  <Grid item xs={8}>
                    {[
                      "CARD_NETWORK",
                      "CARD_ISSUER",
                      "BANK",
                      "CARD_SUB_TYPE",
                    ].includes(values.ruleConditions[it].operand) ? (
                      <Autocomplete
                        disableClearable
                        size="small"
                        id={`${name}.${index}`}
                        value={values.ruleConditions[it].value[index] || null}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        options={list}
                        onChange={(e, v) => {
                          setFieldValue(`${name}.${index}`, v);
                        }}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Value"
                            required
                            name={`${name}.${index}`}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        id={`${name}.${index}`}
                        name={`${name}.${index}`}
                        label="Value"
                        required
                        onChange={handleChange}
                        value={values.ruleConditions[it].value[index]}
                      />
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => arrayHelpers.remove(index)}
                      disabled={values.ruleConditions[it].value.length <= 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      variant="outlined"
                      onClick={() => arrayHelpers.push("")}
                      color="primary"
                      disabled={
                        ![
                          "ONE_OF",
                          "NOT_ONE_OF",
                          "CONTAINS",
                          "NOT_CONTAINS",
                        ].includes(values.ruleConditions[it].operator)
                      }
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))
          ) : (
            <IconButton
              variant="outlined"
              onClick={() => arrayHelpers.push("")}
              color="primary"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </div>
      )}
    />
  );
};
