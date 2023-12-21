import React from "react";
import CommonStyles from "../../CommonStyles";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { isNull } from "lodash";

const SidebarItem = ({ name, path, notiCount }) => {
  //! State
  const navigate = useNavigate();
  const theme = useTheme();
  const active = window.location.pathname === path;

  //! Function
  const onClick = () => {
    navigate(path);
  };

  //! Render
  return (
    <CommonStyles.Button
      variant="text"
      sx={{
        textTransform: "none",
        width: "100%",
        padding: "12px 12px 12px 24px",
        justifyContent: "start",
        borderRadius: "0px 8px 8px 0",
        backgroundColor: active
          ? theme.colors.custom.sidebarBackground
          : "unset",
        gap: "8px",
        "&:hover": {
          backgroundColor: theme.colors.custom.sidebarBackground,
        },
      }}
      onClick={onClick}
    >
      <CommonStyles.Typography>{name}</CommonStyles.Typography>
      {!!notiCount && (
        <CommonStyles.Box
          centered
          sx={{
            height: "20px",
            width: "20px",
            backgroundColor: "#C72549",
            borderRadius: "50%",
          }}
        >
          <CommonStyles.Typography type="normal12" color="background">
            {notiCount}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      )}
    </CommonStyles.Button>
  );
};

export default SidebarItem;
