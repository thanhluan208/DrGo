import React from "react";
import CommonStyles from "../..";

const TimeCell = ({ listTimeRow }) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {listTimeRow.map((time) => {
        return (
          <CommonStyles.Box
            key={time}
            sx={{
              height: " 80px",
              border: "solid 1px #ccc",
              padding: "0 16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {time}
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
};

export default TimeCell;
