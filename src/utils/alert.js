import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function notifRequestOpen(payload) {
  return {
    type: "NOTIF_REQUEST_OPEN",
    payload,
  };
}

export function notifRequestClose(payload) {
  return {
    type: "NOTIF_REQUEST_CLOSE",
    payload,
  };
}

export const notifReducer = (
  state = {
    isOpen: false,
    message: "",
    type: "",
  },
  action
) => {
  switch (action.type) {
    case "NOTIF_REQUEST_OPEN":
      return {
        ...state,
        isOpen: action.payload.isOpen,
        message: action.payload.message,
        type: action.payload.type,
      };
    case "NOTIF_REQUEST_CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default function Notification() {
  const notif = useSelector((state) => state.notif);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifRequestClose());
  };

  return (
    <Snackbar
      open={notif.isOpen}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        severity={notif.type}
        onClose={handleClose}
        elevation={4}
        variant="filled"
      >
        {notif.message}
      </Alert>
    </Snackbar>
  );
}
