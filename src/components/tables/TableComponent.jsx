import * as React from "react";
import { StyledTableCell, StyledTableRow } from "../../utils/helpers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Box } from "@mui/system";
import {
  merchantTableHeaders,
  pspMerchantTableHeaders,
  pspMerchantMethodTableProperties,
  merchantTableProperties,
  pspMerchantTableProperties,
  pspMerchantMethodTableHeaders,
} from "../../utils/constants";

export default function TableComponent({ data, source }) {
  const headers =
    source === "merchant"
      ? merchantTableHeaders
      : source === "pspMerchant"
      ? pspMerchantTableHeaders
      : pspMerchantMethodTableHeaders;
  const rows =
    source === "merchant"
      ? merchantTableProperties
      : source === "pspMerchant"
      ? pspMerchantTableProperties
      : pspMerchantMethodTableProperties;

  return (
    <Box sx={{ flexGrow: 76, p: 3, marginLeft: 8 }}>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              {headers.map((item, index) => {
                return <StyledTableCell key={index}>{item}</StyledTableCell>;
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.id}>
                {rows.map((row, index) => {
                  if (row !== "active")
                    return (
                      <StyledTableCell key={index}>{item[row]}</StyledTableCell>
                    );
                  if (item[row] === true)
                    return <StyledTableCell key={index}>TRUE</StyledTableCell>;
                  return <StyledTableCell key={index}>FALSE</StyledTableCell>;
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
