import React from "react";
import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { useEffect } from "react";
import { Box, CircularProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../config/ChartDays";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [histData, setHistData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const dTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  // if(flag=== true){
  //   histData.map((coin) => {
  //     console.log(coin[0]);
  //     console.log(coin[1]);
  //   })
  // }

  return (
    <ThemeProvider theme={dTheme}>
      <Box
        sx={{
          width: { md: "65%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // marginTop: { lg: 25, xs: 0 },
          padding: { lg: 4, xs: 3 },
          // paddingTop: { xs: 0, lg: 0 },
        }}
      >
        {!histData || flag === false ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : histData ? (
          <>
            <Line
              data={{
                labels: histData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: histData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.label}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
