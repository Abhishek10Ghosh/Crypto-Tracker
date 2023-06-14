import React, { useState } from "react";
import CryptoContext from "../CryptoContext";
import { AlertTitle, Snackbar } from "@mui/material";
// import { Alert } from "@mui/lab/Alert";
const Alert = () => {
  const { alert, setAlert } = CryptoContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <AlertTitle
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </AlertTitle>
    </Snackbar>
  );
};

export default Alert;
