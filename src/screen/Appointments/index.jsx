import React, { useEffect } from "react";
import CommonStyles from "../../components/CommonStyles";
import DatePickerGroup from "./components/DatePickerGroup";
import RightSettings from "./components/RightSettings";
import { grouping, resources } from "../../assets/mockdata";
import Scheduler from "./components/Scheduler";
import { useTranslation } from "react-i18next";
import { useGet, useSave } from "../../stores/useStores";
import cachedKeys from "../../constants/cachedKeys";
import TableAppointment from "./components/TableAppointment";
import FirebaseServices from "../../services/firebaseServices";
import dayjs from "dayjs";
import useFilter from "../../hooks/useFilter";
import useGetListAppointment from "../../hooks/appointments/useGetListAppointment";
import { CircularProgress } from "@mui/material";

export const layoutTypes = {
  SCHEDULER: "SCHEDULER",
  TABLE: "TABLE",
};

const Appointments = () => {
  //! State
  const { t } = useTranslation();
  const save = useSave();
  const {
    filters,
    handleSelectRow,
    handleChangeSort,
    handleSelectAll,
    handleChangePage,
    handleChangePageSize,
    setFilters,
  } = useFilter({
    currentDate: dayjs(),
    sortBy: "time",
    currentPage: 1,
    sortDirection: "asc",
    pageSize: 10,
    selectedRows: [],
  });
  const layoutType =
    useGet(cachedKeys.APPOINTMENTS.LAYOUT_TYPE_APPOINTMENT) ||
    layoutTypes.SCHEDULER;

  const {
    data: dataAppointments,
    isLoading,
    refetch: refetchListAppointment,
    isFetchingPage: isFetchingListAppointment,
    error,
  } = useGetListAppointment(filters);

  //! Function
  useEffect(() => {
    save(
      cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT,
      refetchListAppointment
    );
  }, []);

  //! Render
  if (error)
    return (
      <CommonStyles.Typography type="bold24">
        Something went wrong
      </CommonStyles.Typography>
    );

  return (
    <CommonStyles.Box sx={{ width: "100%" }}>
      <CommonStyles.Box centered sx={{ gap: "10px", justifyContent: "start" }}>
        <CommonStyles.Typography type="bold24">
          {t("appointments")}
        </CommonStyles.Typography>
        {isLoading ||
          (isFetchingListAppointment && (
            <CommonStyles.Box>
              <CircularProgress />
            </CommonStyles.Box>
          ))}
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
          width: "100%",
          height: "36px",
        }}
      >
        <DatePickerGroup
          currentDate={filters.currentDate}
          setFilters={setFilters}
        />
        <RightSettings />
      </CommonStyles.Box>

      {layoutType === layoutTypes.SCHEDULER ? (
        <Scheduler appointments={dataAppointments} filters={filters} />
      ) : (
        <TableAppointment
          filters={filters}
          handleSelectRow={handleSelectRow}
          handleChangeSort={handleChangeSort}
          handleSelectAll={handleSelectAll}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangePageSize}
        />
      )}
    </CommonStyles.Box>
  );
};

export default Appointments;
