import { Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url(./banner2.jpg)",
      }}
    >
      <Container
        sx={{
          height: 500,
          display: "flex",
          flexDirection: "column",
          paddingTop: 15,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all info regarding your favourite Crypto Currency
          </Typography>
        </div>


        <Carousel sx={{height:"50%"}}/>


      </Container>
    </div>
  );
};

export default Banner;
