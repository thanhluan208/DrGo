import React from "react";
import CommonStyles from "..";
import { useTheme } from "@mui/material/styles";

const Card = ({ children, styles }) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        borderRadius: "8px",
        background: theme.colors.white,
        boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
        ...styles,
      }}
    >
      {children}
    </CommonStyles.Box>
  );
};

export default Card;
