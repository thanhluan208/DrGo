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

const Scheduler = () => {
  //! State
  const appointments = useGet(cachedKeys.APPOINTMENTS) || [];
  const save = useSave();

  //! Function
  const handleChangeScheduler = (value) => {
    const { changed } = value;
    const cloneData = cloneDeep(appointments);

    if (changed) {
      const changedId = Object.keys(changed)[0];
      const changePlace = cloneData.findIndex((item) => item.id === +changedId);

      cloneData[changePlace] = {
        ...cloneData[changePlace],
        ...changed[changedId],
      };

      save(cachedKeys.APPOINTMENTS, cloneData);
    }
  };

  useEffect(() => {
    save(cachedKeys.APPOINTMENTS, appointmentsMock);
  }, []);

  //! Render
  return (
    <CommonStyles.Box sx={{ marginTop: "24px" }}>
      <CommonStyles.Scheduler
        data={appointments}
        grouping={grouping}
        resources={resources}
        handleChangeScheduler={handleChangeScheduler}
      />
    </CommonStyles.Box>
  );
};

export default Scheduler;
