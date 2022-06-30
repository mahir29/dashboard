import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Switch,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRulesRequest } from "../../routes/rules/actions";
import { rulesProperties } from "../../utils/constants";
import { StyledTableCell, StyledTableRow } from "../../utils/helpers";
import Notification from "../../utils/alert";

export default function GetAllRuleTable({ merchant, method }) {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(searchRulesRequest({ merchant, method }));
    // eslint-disable-next-line
  }, []);

  const ruleRenderer = rules.rules.map((item) => {
    return (
      <StyledTableRow key={item.id}>
        {rulesProperties.map(function (key, index) {
          if (key !== "priority") {
            return (
              <StyledTableCell align="left" key={index}>
                {item[key]}
              </StyledTableCell>
            );
          }
          return null;
        })}
        <StyledTableCell align="left">
          <Switch {...label} checked={item.active} color="success" disabled/>
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <>
      <Box sx={{ flexGrow: 100, p: 3, marginLeft: 9, marginTop: -3 }}>
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#384d6c" }}>
              <TableRow>
                <StyledTableCell align="left">NAME</StyledTableCell>
                <StyledTableCell align="left">DESCRIPTION</StyledTableCell>
                <StyledTableCell align="left">PAYMENT METHOD</StyledTableCell>
                <StyledTableCell align="left">MERCHANT</StyledTableCell>
                <StyledTableCell align="left">ACTIVE</StyledTableCell>
              </TableRow>
            </TableHead>
            {rules.rules && <TableBody>{ruleRenderer}</TableBody>}
          </Table>
        </TableContainer>
      </Box>
      <Notification />
    </>
  );
}
