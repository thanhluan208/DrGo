import React from "react";
import CommonStyles from "../../CommonStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { isNull } from "lodash";

const SidebarItem = ({ name, path, icon, notiCount }) => {
  //! State
  const navigate = useNavigate();
  const theme = useTheme();

  const active = useLocation().pathname.split("/")[1] === path.replace("/", "");

  //! Function
  const onClick = () => {
    navigate(path);
  };

  //! Render
  return (
    <CommonStyles.Button
      onClick={onClick}
      variant="text"
      sx={{
        justifyContent: "space-between",
        padding: 0,
      }}
    >
      <CommonStyles.Box
        centered
        sx={{
          gap: "24px",
          padding: "12px 24px",
        }}
      >
        {!!icon &&
          icon(
            active ? theme.palette.primary.main : theme.colors.custom.layoutIcon
          )}
        <CommonStyles.Typography type="bold12">{name}</CommonStyles.Typography>
      </CommonStyles.Box>
      {notiCount && (
        <CommonStyles.Box
          centered
          sx={{
            padding: "5px 8.5px",
            background: "#e7f8f6",
            borderRadius: "16px",
          }}
        >
          <CommonStyles.Typography
            type="bold10"
            sx={{
              color: theme.colors.custom.sidebarNotiCount,
            }}
          >
            {notiCount}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      )}
    </CommonStyles.Button>
  );
};

export default SidebarItem;
