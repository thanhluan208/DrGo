import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetDoctorById from "../../hooks/schedule/useGetDoctorById";
import CommonStyles from "../../components/CommonStyles";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import Previous from "../../assets/icons/Previous";
import routes from "../../constants/route";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import DoctorScheduleForm from "../../components/DoctorScheduleForm";

const DoctorScheduleAddNew = () => {
  //! State
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = params;

  const { data: doctorDetail, isLoading } = useGetDoctorById(id);
  const { name, description } = doctorDetail || {};

  const [date, setDate] = useState(dayjs());

  //! Function
  const handleReturn = () => {
    navigate(`${routes.doctorSchedule}/${id}`);
  };

  //! Render

  return (
    <Fragment>
      <CommonStyles.Box
        sx={{
          padding: "0 40px",
        }}
      >
        {isLoading ? (
          <CommonStyles.Box>
            <CircularProgress />
          </CommonStyles.Box>
        ) : (
          <Fragment>
            <CommonStyles.Typography
              type="bold40"
              sx={{
                color: "#000",
              }}
            >
              {name}
            </CommonStyles.Typography>
            <CommonStyles.Typography
              type="normal12"
              sx={{
                color: "#606C80",
              }}
            >
              {description}
            </CommonStyles.Typography>
          </Fragment>
        )}

        <CommonStyles.Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <CommonStyles.Button
            variant="text"
            sx={{
              gap: "5px",
            }}
            onClick={handleReturn}
          >
            <Previous fill="#606C80" />
            <CommonStyles.Typography type="normal16">
              {t("scheduleAction.return")}
            </CommonStyles.Typography>
          </CommonStyles.Button>
          <CommonStyles.Box
            sx={{
              display: "flex",
              gap: "18px",
              "& .MuiFormControl-root": {
                background: "#fff",
                width: 160,
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={["month"]} value={date} />
              <DatePicker views={["year"]} value={date} />
            </LocalizationProvider>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            marginTop: "56px",
          }}
        >
          <DoctorScheduleForm id={id} />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </Fragment>
  );
};

export default DoctorScheduleAddNew;
