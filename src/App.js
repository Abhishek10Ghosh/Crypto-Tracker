import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import React, { Component, useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Alert from "./components/Alert";
import CryptoContext from "./CryptoContext";

function App() {
  // const useStyles = makeStyles({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },
  // });

  // const classes = useStyles();

  return (
    <BrowserRouter>
      <CryptoContext>
        <Box
          sx={{
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/coins/:id" exact element={<CoinPage />} />
          </Routes>
          <Alert />
        </Box>
      </CryptoContext>
    </BrowserRouter>
  );
}

export default App;
