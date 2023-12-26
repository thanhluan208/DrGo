import React from "react";
import CommonStyles from "../../components/CommonStyles";
import DatePickerGroup from "./components/DatePickerGroup";
import RightSettings from "./components/RightSettings";
import { grouping, resources } from "../../assets/mockdata";
import Scheduler from "./components/Scheduler";
import { useTranslation } from "react-i18next";
import { useGet } from "../../stores/useStores";
import cachedKeys from "../../constants/cachedKeys";
import TableAppointment from "./components/TableAppointment";

export const layoutTypes = {
  SCHEDULER: "SCHEDULER",
  TABLE: "TABLE",
};

const Appointments = () => {
  //! State
  const { t } = useTranslation();
  const layoutType =
    useGet(cachedKeys.LAYOUT_TYPE_APPOINTMENT) || layoutTypes.SCHEDULER;

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

      {layoutType === layoutTypes.SCHEDULER ? (
        <Scheduler />
      ) : (
        <TableAppointment />
      )}
    </CommonStyles.Box>
  );
};

export default Appointments;
