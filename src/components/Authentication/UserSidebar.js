import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../CryptoContext";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import {AiFillDelete} from "react-icons/ai"
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async(coin) => {
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

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              widht: 38,
              // marginLeft:15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              style={{
                width: 350,
                padding: 25,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                    // display: "flex",
                    // flexDirection: "row",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    borderRadius: 10,
                    padding: 15,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div
                          style={{
                            padding: 10,
                            borderRadius: 5,
                            color: "black",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#EEBC1D",
                            boxShadow: "0 0 3px black",
                          }}
                        >
                          <span>{coin.name}</span>
                          <span style={{display:"flex", gap:8}}>{symbol}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete style={{cursor:"pointer"}}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 20,
                }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
