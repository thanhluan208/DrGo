import React from "react";
import CommonStyles from "../../components/CommonStyles";
import DatePickerGroup from "./components/DatePickerGroup";
import RightSettings from "./components/RightSettings";
import { grouping, resources } from "../../assets/mockdata";
import Scheduler from "./components/Scheduler";
import { useTranslation } from "react-i18next";

const Appointments = () => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ width: "100%" }}>
      <CommonStyles.Typography type="bold24">
        {t("appointments")}
      </CommonStyles.Typography>
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
          width: "100%",
          height: "36px",
        }}
      >
        <DatePickerGroup />
        <RightSettings />
      </CommonStyles.Box>

      <Scheduler />
    </CommonStyles.Box>
  );
};

export default Appointments;
