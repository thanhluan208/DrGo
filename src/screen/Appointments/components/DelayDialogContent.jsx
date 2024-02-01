import React, { useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Close from "../../../assets/icons/Close";
import { useTheme } from "@mui/material";
import ButtonSelectDate from "./ButtonSelectDate";

const delay = [5, 10, 15];

const DelayDialogContent = ({ toggle }) => {
  //! State
  const [delayTime, setDelayTime] = useState(10);
  const theme = useTheme();

  //! Function
  const handleChange = (value) => {
    console.log("value", value);
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        width: 500,
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderBottom: "solid 1px #E8E8E8",
        }}
      >
        <CommonStyles.Typography type="bold20">
          Select Delay Time
        </CommonStyles.Typography>

        <CommonStyles.IconButton onClick={toggle}>
          <Close />
        </CommonStyles.IconButton>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          padding: "42px 125px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {delay.map((item) => {
          return (
            <CommonStyles.Button
              variant={delayTime === item ? "contained" : "outlined"}
              sx={{
                padding: "15px 25px 15px 20px",
                width: "100%",
                borderRadius: "50px",
              }}
              onClick={() => setDelayTime(item)}
            >
              <CommonStyles.Typography
                type="normal20"
                sx={{
                  color:
                    delayTime === item ? "#fff" : theme.palette.primary.main,
                }}
              >
                {item} minutes
              </CommonStyles.Typography>
            </CommonStyles.Button>
          );
        })}

        <ButtonSelectDate handleChange={handleChange} />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default DelayDialogContent;
