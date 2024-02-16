import React from "react";
import CommonStyles from "../../CommonStyles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Search from "../../../assets/icons/Search";
import Bell from "../../../assets/icons/Bell";
import User from "./User";

const Header = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        marginTop: "39px",
        marginBottom: "24px",
        width: "100%",
        paddingLeft: "48px",
        paddingRight: "34px",
        display: "flex",
        justifyContent: "space-between",
        fieldset: {
          border: 0,
          borderRadius: "100px",
        },
        input: {
          width: 350,
          height: 40,
          padding: 0,
        },
      }}
    >
      <TextField
        placeholder="Search"
        sx={{
          background: "#fff",
          borderRadius: "100px",
          height: "40px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <CommonStyles.Box
        sx={{
          display: "flex",
          gap: "26px",
        }}
      >
        <CommonStyles.IconButton
          notiCount={9}
          customSx={{
            svg: {
              animation: "shake 2s infinite ease-in-out",
              "@keyframes shake": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "50%": {
                  transform: "rotate(-45deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            },
          }}
        >
          <Bell />
        </CommonStyles.IconButton>
        {/* <CommonStyles.IconButton>
          <CommonStyles.Box
            centered
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#E8E8E8",
            }}
          >
            <CommonStyles.Avatar
              src={
                "https://i.pinimg.com/564x/73/e4/69/73e4692c5447a0ed7b0eac5d3e008469.jpg"
              }
            />
          </CommonStyles.Box>
        </CommonStyles.IconButton> */}
        <User />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Header;
