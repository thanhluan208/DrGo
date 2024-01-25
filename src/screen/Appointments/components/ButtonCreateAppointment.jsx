import React, { Fragment, memo } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "../../../components/CommonStyles";
import { useTranslation } from "react-i18next";
import Add from "../../../assets/icons/Add";
import { useTheme } from "@mui/material";
import DialogContent from "./DialogContent";

const ButtonCreateAppointment = () => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();
  const theme = useTheme();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Button
        sx={{
          padding: "12px 25px",
          borderRadius: "50px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }}
        onClick={toggle}
      >
        <Add />
        <CommonStyles.Typography
          type="normal20"
          sx={{
            color: theme.colors.white,
          }}
        >
          {t("appointment.newAppointment")}
        </CommonStyles.Typography>
      </CommonStyles.Button>
      {shouldRender && (
        <CommonStyles.Dialog
          open={open}
          handleClose={toggle}
          dialogContent={<DialogContent toggle={toggle} />}
        />
      )}
    </Fragment>
  );
};

export default ButtonCreateAppointment;
