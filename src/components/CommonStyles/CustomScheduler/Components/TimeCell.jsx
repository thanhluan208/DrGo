import React from "react";
import CommonStyles from "../..";
import { useTheme } from "@mui/material";

const TimeCell = ({ listTimeRow, rowHeight, startDate }) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render

  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        background: theme.colors.custom.layoutBackground,
        flexDirection: "column",
        position: "sticky",
        height: "100%",
        left: 0,
        zIndex: 10,
        "& .cell": {
          height: rowHeight,
          width: "90px",
        },
      }}
    >
      <CommonStyles.Typography
        type="normal16"
        sx={{
          borderTop: "none !important",
          color: "#B1B1B1",
          height: "70px",
        }}
      >
        Week
      </CommonStyles.Typography>
      {listTimeRow.map((time) => {
        return (
          <CommonStyles.Typography
            type="normal16"
            key={time}
            className="cell"
            sx={{
              color: "#B1B1B1",
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {time}
          </CommonStyles.Typography>
        );
      })}
    </CommonStyles.Box>
  );
};

export default TimeCell;
