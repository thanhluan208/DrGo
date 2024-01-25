import React from "react";
import MUIIconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import CommonStyles from "..";

const IconButton = ({
  children,
  notiCount,
  customSx,
  shouldHasNoti = true,
  ...otherProps
}) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <MUIIconButton
      sx={{
        borderRadius: "4px",
        padding: "8px 0px",
        "&:hover": {
          background: "transparent",
        },
        ...customSx,
      }}
      {...otherProps}
    >
      {notiCount && (
        <CommonStyles.Box
          centered
          sx={{
            position: "absolute",
            top: "10px",
            right: "-10px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: theme.colors.custom.layoutBackground,
            zIndex: 100,
          }}
        >
          <CommonStyles.Box
            centered
            sx={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#FF6760",
              color: "#F6F8FB",
              fontSize: "10px",
              fontWeight: "700",
              lineHeight: "12px",
              letterSpacing: "0.2px",
              fontFamily: "Poppins",
              position: "relative",
            }}
          >
            {notiCount}
          </CommonStyles.Box>
        </CommonStyles.Box>
      )}
      {children}
    </MUIIconButton>
  );
};

export default IconButton;
