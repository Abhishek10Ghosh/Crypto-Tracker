import { Box } from "@mui/material";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: 3,
        paddingLeft: 1,
        paddingRight: 1,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;
