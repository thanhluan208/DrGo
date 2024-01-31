import React, { useMemo } from "react";

const Scheduler = React.createContext({
  pxPerStep: 0,
  stepUnit: "minute",
  startDate: new Date(),
  endDate: new Date(),
});

export const useScheduler = () => React.useContext(Scheduler);

const SchedulerProvider = ({
  children,
  pxPerStep,
  stepUnit,
  startDate,
  endDate,
}) => {
  const value = useMemo(() => {
    return {
      pxPerStep,
      stepUnit,
      startDate,
      endDate,
    };
  }, [pxPerStep, stepUnit, startDate, endDate]);

  return <Scheduler.Provider value={value}>{children}</Scheduler.Provider>;
};

export default SchedulerProvider;
