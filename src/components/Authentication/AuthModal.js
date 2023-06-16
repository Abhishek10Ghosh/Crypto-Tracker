import React, { useState } from "react";

// import * as React from 'react';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  // border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  width: 400,
  backgroundColor: "background.paper",
  color: "white",
  borderRadius: 5,
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setAlert } = CryptoState();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(value);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          widht: 85,
          height: 40,
          // marginLeft:1,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              sx={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullwidth"
                sx={{ borderRadius: 10 }}
                centered
              >
                <Tab label="Login" />
                <Tab label="SIgn Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box
              style={{
                padding: 24,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 20,
                fontSize: 20,
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// export default AuthModal
