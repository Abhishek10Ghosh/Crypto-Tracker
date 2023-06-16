import React, { useState } from "react";
import CryptoContext, { CryptoState } from "../CryptoContext";
import { AlertTitle, Snackbar, Alert } from "@mui/material";
// import { Alert } from "@mui/lab/Alert";
const Alerting = () => {
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  // console.log(alert.open);
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Alerting;
