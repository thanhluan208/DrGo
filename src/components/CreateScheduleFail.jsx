import React from "react";
import CommonStyles from "./CommonStyles";
import Close from "../assets/icons/Close";
import Fail from "../assets/icons/Fail";
import { useTranslation } from "react-i18next";

const CreateScheduleFail = ({ toggle, isEdit }) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        width: "689px",
        height: "439px",
        borderRadius: "50px",
        position: "relative",
        flexDirection: "column",
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

      <Fail />
      <CommonStyles.Typography
        type="normal40"
        sx={{
          color: "#000",
          textAlign: "center",
          padding: "0 35px",
          marginTop: "50px",
        }}
      >
        {t("scheduleAction.actionScheduleFailed")}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default CreateScheduleFail;
