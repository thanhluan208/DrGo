import React from "react";
import CommonStyles from "../../components/CommonStyles";
import { useTranslation } from "react-i18next";
import ButtonCreateAppointment from "./components/ButtonCreateAppointment";
import TableAppointments from "./components/TableAppointments";

const Appointments = () => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "0 40px",
        paddingBottom: "100px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CommonStyles.Typography
          type="bold40"
          sx={{
            color: "#25282B",
          }}
        >
          {t("appointment.appointments")}
        </CommonStyles.Typography>

        <ButtonCreateAppointment />
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          marginTop: "32px",
        }}
      >
        <TableAppointments />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Appointments;
