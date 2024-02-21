import React, { Fragment } from "react";
import CommonStyles from "../../../components/CommonStyles";
import { useTranslation } from "react-i18next";
import DialogEditAndCreate from "../dialogs/DialogEditAndCreate";
import useToggleDialog from "../../../hooks/useToggleDialog";
import { useTheme } from "@mui/material";

const CreateButton = () => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();
  const { t } = useTranslation();
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Button
        sx={{
          padding: "15px 24px",
          borderRadius: "8px",
          boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
        }}
        onClick={toggle}
      >
        <CommonStyles.Typography
          type="normal14"
          sx={{
            color: theme.colors.white,
          }}
        >
          Create new patient
        </CommonStyles.Typography>
      </CommonStyles.Button>
      {shouldRender && (
        <CommonStyles.Dialog
          handleClose={toggle}
          open={open}
          maxWidth="md"
          fullWidth
          dialogContent={<DialogEditAndCreate toggle={toggle} />}
        />
      )}
    </Fragment>
  );
};

export default CreateButton;
