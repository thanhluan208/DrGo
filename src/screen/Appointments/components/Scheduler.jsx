import React, { useEffect, useMemo } from "react";
import CommonStyles from "../../../components/CommonStyles";
import { grouping } from "../../../assets/mockdata";
import { useGet, useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import dayjs from "dayjs";
import FirebaseServices from "../../../services/firebaseServices";
import { toast } from "react-toastify";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";
import { cloneDeep } from "lodash";

const Scheduler = ({ appointments = [], filters }) => {
  //! State
  const parsedAppointments = useMemo(() => {
    const nextAppointments = cloneDeep(appointments);

    return nextAppointments.map((item) => {
      return {
        ...item,
        doctor: item?.doctor?.id,
      };
    });
  }, [appointments]);

  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );
  const save = useSave();

  const currentDate = useMemo(() => {
    return filters.currentDate.toDate();
  }, [filters]);

  const { data: listDoctor, isLoading: isLoadingListDoctor } =
    useGetListDoctor();

  const resources = useMemo(() => {
    return [
      {
        fieldName: "doctor",
        title: "doctor",
        instances: listDoctor,
      },
    ];
  }, [listDoctor]);

  //! Function
  const handleChangeScheduler = async (value) => {
    const { changed } = value;
    const changedId = Object.keys(changed)[0];

    save(cachedKeys.APPOINTMENTS.CURRENT_EDITING_APPOINTMENT, changedId);
    const toastId = toast.loading("Editing appointment...", {
      autoClose: false,
    });

    try {
      if (changed) {
        const { doctor, startDate, endDate } = changed[changedId];

        if (dayjs(changed[changedId].startDate).isBefore(dayjs())) {
          toast.update(toastId, {
            render: "Cannot change appointment to past ",
            type: "error",
            autoClose: 1000,
            isLoading: false,
          });
          save(cachedKeys.APPOINTMENTS.CURRENT_EDITING_APPOINTMENT, null);

          return;
        }

        await FirebaseServices.updateAppointment(changedId, {
          doctor,
          startDate: startDate.valueOf(),
          endDate: endDate.valueOf(),
        });

        await refetchListAppointment();

        save(cachedKeys.APPOINTMENTS.CURRENT_EDITING_APPOINTMENT, null);

        toast.update(toastId, {
          render: "Edit appointment successfully!",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.update(toastId, {
        render: "Edit appointment failed!",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    save(cachedKeys.APPOINTMENTS.LIST_DOCTOR, listDoctor);
  }, [listDoctor, save]);
  //! Render
  if (!listDoctor) return null;

  if (!parsedAppointments) return null;

  return (
    <CommonStyles.Box sx={{ marginTop: "24px" }}>
      <CommonStyles.Scheduler
        data={parsedAppointments}
        grouping={grouping}
        resources={resources}
        handleChangeScheduler={handleChangeScheduler}
        currentDate={currentDate}
        loadingResource={isLoadingListDoctor}
      />
    </CommonStyles.Box>
  );
};

export default Scheduler;
