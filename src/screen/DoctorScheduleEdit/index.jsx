import { CircularProgress, useTheme } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useGetDoctorById from "../../hooks/schedule/useGetDoctorById";
import CommonStyles from "../../components/CommonStyles";
import Previous from "../../assets/icons/Previous";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useFilter from "../../hooks/useFilter";
import useGetSchedules from "../../hooks/schedule/useGetSchedules";
import DoctorScheduleForm from "../../components/DoctorScheduleForm";
import routes from "../../constants/route";
import { isEmpty } from "lodash";
import useToggleDialog from "../../hooks/useToggleDialog";

const DoctorScheduleEdit = () => {
  //! State
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { id } = params;
  const { filters, setFilters } = useFilter({
    doctor: id,
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const { data: doctorDetail, isLoading } = useGetDoctorById(id);
  const {
    data: listSchedules,
    isLoading: loadingListSchedules,
    refetch: refecthListSchedules,
  } = useGetSchedules(filters, !!id);

  console.log("list", listSchedules);

  const { name, description } = doctorDetail || {};

  //! Function
  const handleReturn = () => {
    navigate(`${routes.doctorSchedule}/${id}`);
  };

  const handleChangeDate = (type, date) => {
    if (type === "year") {
      setFilters((prev) => {
        return {
          ...prev,
          startDate: date.startOf("year").startOf("month"),
          endDate: date.startOf("year").endOf("month"),
        };
      });
      return;
    }
    setFilters((prev) => {
      return {
        ...prev,
        startDate: date
          .startOf("month")
          .set("year", filters.startDate.format("YYYY")),
        endDate: date
          .endOf("month")
          .set("year", filters.endDate.format("YYYY")),
      };
    });
  };

  //! Render

  return (
    <CommonStyles.Box
      sx={{
        padding: "0 40px",
        paddingBottom: "40px",
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
            <DatePicker
              views={["month"]}
              value={filters.startDate}
              onChange={(value) => {
                handleChangeDate("month", value);
              }}
            />
            <DatePicker
              views={["year"]}
              value={filters.startDate}
              onChange={(value) => {
                handleChangeDate("year", value);
              }}
            />
          </LocalizationProvider>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          marginTop: "56px",
          display: "flex",
          gap: "32px",
          flexDirection: "column",
        }}
      >
        {loadingListSchedules ? (
          <CommonStyles.Box>
            <CircularProgress />
          </CommonStyles.Box>
        ) : (
          listSchedules.map((schedule) => {
            return (
              <DoctorScheduleForm
                key={schedule?.id}
                data={schedule}
                id={id}
                refecthListSchedules={refecthListSchedules}
              />
            );
          })
        )}

        {!loadingListSchedules && isEmpty(listSchedules) ? (
          <CommonStyles.Typography>No schedule found</CommonStyles.Typography>
        ) : null}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default DoctorScheduleEdit;
