import CommonStyles from "../../components/CommonStyles";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import useFilter from "../../hooks/useFilter";
import dayjs from "dayjs";
import useGetListAppointment from "../../hooks/appointments/useGetListAppointment";
import useGetListDoctor from "../../hooks/appointments/useGetListDoctor";
import FirebaseServices from "../../services/firebaseServices";
import { useRemove, useSave } from "../../stores/useStores";
import cachedKeys from "../../constants/cachedKeys";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import DatePickerGroup from "./components/DatePickerGroup";
import RightSettings from "./components/RightSettings";

const Home = () => {
  //! State
  const save = useSave();
  const remove = useRemove();
  const { t } = useTranslation();

  const { filters, setFilters } = useFilter({
    currentDate: dayjs(),
    sortBy: "time",
    currentPage: 1,
    sortDirection: "asc",
    pageSize: 10,
    selectedRows: [],
  });

  const {
    data: dataAppointments,
    isLoading,
    refetch: refetchListAppointment,
    isFetchingPage: isFetchingListAppointment,
    // error,
  } = useGetListAppointment(filters);

  const { data: listDoctor, isLoading: isLoadingListDoctor } =
    useGetListDoctor();

  //! Function

  const handleCheckShouldDisableTimeCell = useCallback((time) => {
    if (time && time.split(":")[1] === "30") {
      return true;
    }
    return false;
  }, []);

  const handleChangeAppointment = useCallback(async (value, setLoading) => {
    const { id, endDate } = value;
    setLoading(true);
    const toastId = toast.loading("Updating appointment...", {
      autoClose: false,
    });

    try {
      const response = await FirebaseServices.updateAppointmentEndDate(
        id,
        endDate
      );

      await refetchListAppointment();

      console.log("response", response);
      toast.update(toastId, {
        render: "Update appointment successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    } catch (error) {
      console.log("err", error);
      toast.update(toastId, {
        render: "Update appointment failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  }, []);

  const handleDragEnd = useCallback(
    async (result, provider) => {
      const { draggableId, destination } = result || {};
      const { droppableId } = destination || {};

      if (!draggableId || !droppableId || !destination) return;

      const toastId = toast.loading("Updating appointment...", {
        autoClose: false,
      });
      try {
        const [time, doctorId] = droppableId.split("_");
        const [appointmentID, startDate, endDate] = draggableId.split("_");

        const appointmentDuration = dayjs(new Date(+endDate)).diff(
          new Date(+startDate),
          "minute"
        );

        const appointmentStart = dayjs(time, "HH:mm");
        const appointmentEnd = appointmentStart.add(
          appointmentDuration,
          "minute"
        );

        save(
          `${cachedKeys.APPOINTMENTS.PENDING_APPOINTMENT}_${time}_${doctorId}`,
          {
            startDate: dayjs(new Date(+startDate)),
            endDate: dayjs(new Date(+endDate)),
          }
        );

        save(
          `${cachedKeys.APPOINTMENTS.PENDING_APPOINTMENT}_${appointmentID}`,
          true
        );

        await FirebaseServices.updateAppointmentByDrag(appointmentID, {
          doctor: doctorId,
          startDate: appointmentStart.toDate(),
          endDate: appointmentEnd.toDate(),
        });

        await refetchListAppointment();

        toast.update(toastId, {
          render: "Update appointment successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        remove(
          `${cachedKeys.APPOINTMENTS.PENDING_APPOINTMENT}_${time}_${doctorId}`
        );
        remove(
          `${cachedKeys.APPOINTMENTS.PENDING_APPOINTMENT}_${appointmentID}`
        );
      } catch (error) {
        console.log("err", error);
        toast.update(toastId, {
          render: "Update appointment failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    [save, remove, refetchListAppointment]
  );

  useEffect(() => {
    save(cachedKeys.APPOINTMENTS.LIST_DOCTOR, listDoctor);
  }, [listDoctor, save]);

  useEffect(() => {
    save(
      cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT,
      refetchListAppointment
    );
  }, [refetchListAppointment, save]);
  //! Render

  return (
    <CommonStyles.Box sx={{ padding: "20px" }}>
      <CommonStyles.Box centered sx={{ gap: "10px", justifyContent: "start" }}>
        <CommonStyles.Typography type="bold24">
          {t("appointments")}
        </CommonStyles.Typography>
        {(isLoading || isFetchingListAppointment) && (
          <CommonStyles.Box>
            <CircularProgress />
          </CommonStyles.Box>
        )}
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "36px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <DatePickerGroup
          currentDate={filters.currentDate}
          setFilters={setFilters}
        />
        <RightSettings />
      </CommonStyles.Box>

      <CommonStyles.CustomScheduler
        checkShouldDisableTimeCell={handleCheckShouldDisableTimeCell}
        checkCustomBorder={handleCheckShouldDisableTimeCell}
        customBorder="dashed 1px #ccc"
        headerList={listDoctor}
        appointments={dataAppointments}
        onChangeAppointment={handleChangeAppointment}
        loading={isLoading || isLoadingListDoctor}
        onDragEnd={handleDragEnd}
      />
    </CommonStyles.Box>
  );
};

export default Home;
