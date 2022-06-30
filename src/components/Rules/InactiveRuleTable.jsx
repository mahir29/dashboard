import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Button,
  IconButton,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteRuleRequest,
  fetchInactiveRules,
  changeActivityRequest,
} from "../../routes/rules/actions";
import { rulesProperties } from "../../utils/constants";
import { StyledTableCell, StyledTableRow } from "../../utils/helpers";
import ConfirmDialog from "../../utils/confirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../utils/alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function InactiveRuleTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const rules = useSelector((state) => state.rules);
  const { merchant, method } = location.state;
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(fetchInactiveRules({ merchant, method }));
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(
      deleteRuleRequest({
        id: id,
        merchant: merchant,
        method: method,
      })
    );
  };

  const handleActive = ({ id, active, merchant, method }) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to change the activity?",
      onConfirm: () => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(
          changeActivityRequest({
            id: id,
            activity: !active,
            merchant: merchant,
            method: method,
          })
        );
      },
      onFail: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const inactiveRenderer = rules.rules.map((item) => {
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
          <Switch
            {...label}
            checked={item.active}
            color="success"
            onChange={() =>
              handleActive({
                id: item.id,
                active: item.active,
                merchant: merchant,
                method: method,
              })
            }
          />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure to delete this rule?",
                onConfirm: () => {
                  onDelete(item.id);
                },
                onFail: () =>
                  setConfirmDialog({ ...confirmDialog, isOpen: false }),
              });
            }}
            color="error"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <>
      <Box sx={{ flexGrow: 100, p: 3, marginLeft: 9 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            height: "2.4rem",
            width: "11rem",
            backgroundColor: "#007a6f",
            mb: "2rem",
          }}
          onClick={() => navigate("/rules")}
        >
          BACK
        </Button>
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#384d6c" }}>
              <TableRow>
                <StyledTableCell align="left">NAME</StyledTableCell>
                <StyledTableCell align="left">DESCRIPTION</StyledTableCell>
                <StyledTableCell align="left">PAYMENT METHOD</StyledTableCell>
                <StyledTableCell align="left">MERCHANT</StyledTableCell>
                <StyledTableCell align="left">ACTIVE</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            {rules.rules && <TableBody>{inactiveRenderer}</TableBody>}
          </Table>
        </TableContainer>
      </Box>
      <ConfirmDialog confirmDialog={confirmDialog} />
      <Notification />
    </>
  );
}
