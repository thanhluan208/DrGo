import React from "react";
import MUIIconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import CommonStyles from "..";

const IconButton = ({ children, hasNoti, ...otherProps }) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <MUIIconButton
      sx={{
        borderRadius: "4px",
        padding: "8px 12px",
        svg: {
          width: "20px",
          height: "20px",
          color: "#000",
        },
        div: {
          width: "20px",
          height: "20px",
          position: "relative",

          "&:after": {
            content: hasNoti ? '""' : "none",
            position: "absolute",
            top: "0",
            right: "3px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "red",
          },
        },
      }}
      {...otherProps}
    >
      <div>{children}</div>
    </MUIIconButton>
  );
};

export default IconButton;
