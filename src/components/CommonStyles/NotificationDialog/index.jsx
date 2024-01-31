import React from "react";
import { useTranslation } from "react-i18next";
import CommonStyles from "..";
import Close from "../../../assets/icons/Close";
import { ButtonType } from "../Button";

const NotificationDialog = ({ icon, text, toggle, confirmCallback }) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        width: "689px",
        minHeight: "439px",
        borderRadius: "50px",
        position: "relative",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      <CommonStyles.Box
        centered
        sx={{
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CommonStyles.IconButton
          customSx={{
            position: "absolute",
            top: "20px",
            right: "40px",
            cursor: "pointer",
          }}
          onClick={toggle}
        >
          <CommonStyles.Box
            sx={{
              padding: "12px",
            }}
          >
            <Close />
          </CommonStyles.Box>
        </CommonStyles.IconButton>

        {icon}
        <CommonStyles.Typography
          type="normal40"
          sx={{
            color: "#000",
            textAlign: "center",
            padding: "0 35px",
          }}
        >
          {text}
        </CommonStyles.Typography>
      </CommonStyles.Box>

      {confirmCallback && (
        <CommonStyles.Box
          centered
          sx={{
            marginTop: "32px",
            width: "100%",
            padding: "0 20px",
            gap: "15px",
          }}
        >
          <CommonStyles.Button
            buttonType={ButtonType.PRIMARY}
            sx={{
              width: "150px",
            }}
            onClick={confirmCallback}
          >
            <CommonStyles.Typography
              type="normal20"
              sx={{
                color: "#fff",
              }}
            >
              Confirm
            </CommonStyles.Typography>
          </CommonStyles.Button>
          <CommonStyles.Button
            variant="outlined"
            buttonType={ButtonType.SECONDARY}
            onClick={toggle}
          >
            <CommonStyles.Typography
              type="normal20"
              sx={{
                color: "#000",
              }}
            >
              Cancel
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
};

export default NotificationDialog;
