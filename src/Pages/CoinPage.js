import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { useEffect } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, [currency]);

  const inWatchlist = watchlist.includes(coin?.id); //if it already includes coins then true

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, { coins: watchlist.filter((wish) => wish !== coin?.id) },
      { merge: true });

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center" },
      }}
    >
      <Box
        sx={{
          width: { lg: "35%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 10 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 5,
            paddingBottom:0,
            // paddingBottom: 10,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
          {/* // split to display 1st line only  */}
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            padding: 5,
            paddingTop: 2,
            width: "100%",
            display: { xs: "flex", lg: "block" },
            flexDirection: "column",
            alignItems: { xs: "start", sm: "center", lg: "start" },
            justifyContent: "space-around",
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                // marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                // marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                // marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor:inWatchlist ? "#ff0000" : "#EEBC1D",
                marginTop: 20,
              }}
              onClick={inWatchlist? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist?"Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
