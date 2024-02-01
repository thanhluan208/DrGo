import React, { useCallback } from "react";
import CommonStyles from "../..";
import { useScheduler } from "./SchedulerProvider";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";
import ScheduleTime from "../../../../assets/icons/ScheduleTime";

const SchedulerContentColumn = ({ date, listTimeRow, listSchedules = [] }) => {
  //! State
  const formatedDate = date.format("DD \n ddd");
  const { pxPerStep, startDate } = useScheduler();
  const theme = useTheme();

  const isToday = date.isSame(dayjs(), "day");
  //! Function

  //! Render
  const renderSchedules = useCallback(() => {
    return listSchedules.map((schedule) => {
      const startTimeOfColumn = dayjs(
        `${date.format("YYYY-MM-DD")}/09:00`,
        "YYYY-MM-DD/HH:mm"
      );

      const formatedStartTime = dayjs(schedule?.startTime).format("HH:mm");
      const formatedEndTime = dayjs(schedule?.endTime).format("HH:mm");

      const timeDiff = dayjs(schedule?.startTime).diff(
        startTimeOfColumn,
        "minute"
      );

      const top = timeDiff * pxPerStep + 70;

      return (
        <CommonStyles.Box
          key={schedule?.id}
          sx={{
            position: "absolute",
            left: 0,
            top: top,
            height: "97px",
            width: "100%",
            background: theme.colors.custom.scheduleBackground,
            borderLeft: `4px solid ${theme.colors.custom.scheduleBorder}`,
            borderRadius: "4px",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <CommonStyles.Typography
            type="bold14"
            sx={{
              color: theme.colors.custom.scheduleBorder,
            }}
          >
            {"Operation Clinic"}
          </CommonStyles.Typography>
          <CommonStyles.Typography
            type="normal14"
            sx={{
              color: theme.colors.custom.scheduleBorder,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <ScheduleTime />
            {`${formatedStartTime} - ${formatedEndTime}`}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      );
    });
  }, [listSchedules, startDate, pxPerStep, date]);

  return (
    <CommonStyles.Box
      sx={{
        position: "relative",
      }}
    >
      {renderSchedules()}
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "70px",
        }}
      >
        <CommonStyles.Typography
          type="normal16"
          sx={{
            whiteSpace: "pre-line",
            textAlign: "center",
            color: isToday ? theme.palette.primary.main : "#B1B1B1",
          }}
        >
          {formatedDate}
        </CommonStyles.Typography>
      </CommonStyles.Box>
      {listTimeRow.map((time) => {
        return (
          <CommonStyles.Box
            key={time + formatedDate}
            sx={{
              height: "48px",
              borderTop: "1px solid #B1B1B1",
              borderRight: "1px solid #B1B1B1",
            }}
          />
        );
      })}
    </CommonStyles.Box>
  );
};

export default SchedulerContentColumn;
