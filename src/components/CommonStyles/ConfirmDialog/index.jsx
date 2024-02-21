import React, { Fragment } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "..";
import Close from "../../../assets/icons/Close";
import { useTheme } from "@mui/material";

const ConfirmDialog = ({
  toggle,
  title,
  content,
  confirmCallback,
  loading,
}) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "12px 24px 39px 24px",
        width: "100%",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItmes: "center",
        }}
      >
        <CommonStyles.Box centered>
          <CommonStyles.Typography
            type="bold20"
            sx={{
              color: "#25282B",
            }}
          >
            {title}
          </CommonStyles.Typography>
        </CommonStyles.Box>

        <CommonStyles.IconButton onClick={toggle}>
          <CommonStyles.Box
            sx={{
              padding: "12px",
            }}
          >
            <Close />
          </CommonStyles.Box>
        </CommonStyles.IconButton>
      </CommonStyles.Box>

      <CommonStyles.Typography
        type="normal20"
        sx={{ color: "#25282B", margin: "12px 0" }}
      >
        {content}
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CommonStyles.Button
          loading={loading}
          variant="outlined"
          color="error"
          sx={{
            padding: "15px 24px",
            borderRadius: "8px",
          }}
        >
          <CommonStyles.Typography
            type="normal14"
            sx={{
              color: theme.palette.primary.error,
            }}
          >
            Cancel
          </CommonStyles.Typography>
        </CommonStyles.Button>
        <CommonStyles.Button
          loading={loading}
          onClick={confirmCallback}
          sx={{
            padding: "15px 24px",
            borderRadius: "8px",
            boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
          }}
        >
          <CommonStyles.Typography
            type="normal14"
            sx={{
              color: theme.colors.white,
            }}
          >
            Confirm
          </CommonStyles.Typography>
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default ConfirmDialog;
