import React, { useEffect } from "react";
import CommonStyles from "../../../components/CommonStyles";
import {
  grouping,
  resources,
  appointments as appointmentsMock,
} from "../../../assets/mockdata";
import { useGet, useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import useToast from "../../../hooks/useToast";

const Scheduler = () => {
  //! State
  const appointments = useGet(cachedKeys.APPOINTMENTS) || [];
  const currentDate = useGet(cachedKeys.CURRENT_DATE_APPOINTMENT) || dayjs();
  const save = useSave();

  //! Function
  const handleChangeScheduler = (value) => {
    const { changed } = value;
    const cloneData = cloneDeep(appointments);

    if (changed) {
      const changedId = Object.keys(changed)[0];

      if (dayjs(changed[changedId].startDate).isBefore(dayjs())) {
        useToast("Cannot change appointment to past ", "error");
        return;
      }

      const changePlace = cloneData.findIndex((item) => item.id === +changedId);

      cloneData[changePlace] = {
        ...cloneData[changePlace],
        ...changed[changedId],
      };

      save(cachedKeys.APPOINTMENTS, cloneData);
    }
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ marginTop: "24px" }}>
      <CommonStyles.Scheduler
        data={appointments}
        grouping={grouping}
        resources={resources}
        handleChangeScheduler={handleChangeScheduler}
        currentDate={currentDate.toDate()}
      />
    </CommonStyles.Box>
  );
};

export default Scheduler;
