import React, { memo, useMemo } from "react";
import CommonStyles from "..";
import dayjs from "dayjs";
import TimeCell from "./Components/TimeCell";
import { cloneDeep } from "lodash";
import SchedulerProvider from "./Components/SchedulerProvider";
import { CircularProgress } from "@mui/material";
import { useSave } from "../../../stores/useStores";
import { useTheme } from "@emotion/react";
import { sidebarWidth } from "../../DefaultLayout";
import SchedulerContentColumn from "./Components/SchedulerContentColumn";

const CustomerScheduler = ({
  startDate = dayjs("09:00", "HH:mm"),
  endDate = dayjs("18:00", "HH:mm"),
  step = 30,
  stepUnit = "minute",
  rowHeight = 48,
  schedules,
  loading,
}) => {
  //! State

  const headerList = useMemo(() => {
    const list = [];

    for (let i = startDate; i.isBefore(endDate); i = i.add(1, "day")) {
      list.push(i);
    }

    return list;
  }, [startDate, endDate]);

  const listTimeRow = useMemo(() => {
    const list = [];
    const start = cloneDeep(startDate).startOf("day").add(9, "hour");
    const end = cloneDeep(startDate).startOf("day").add(18, "hour");

    for (
      let i = start;
      i.isBefore(end) || i.isSame(end);
      i = i.add(step, stepUnit)
    ) {
      list.push(i.format("HH:mm"));
    }

    return list;
  }, [startDate, endDate]);

  const pxPerStep = useMemo(() => {
    return rowHeight / step;
  }, [rowHeight, step]);

  //! Function

  //! Render

  return (
    <SchedulerProvider
      pxPerStep={pxPerStep}
      stepUnit={stepUnit}
      startDate={startDate}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          position: "relative",
          width: `100%`,
          overflow: loading ? "hidden" : "auto",
        }}
      >
        {loading && (
          <CommonStyles.Box
            centered
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <CircularProgress />
          </CommonStyles.Box>
        )}
        <TimeCell
          listTimeRow={listTimeRow}
          rowHeight={rowHeight}
          startDate={startDate}
        />

        <CommonStyles.Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(7, minmax(200px, calc(100% / 7)))",
          }}
        >
          {headerList.map((item) => {
            const listSchedules = cloneDeep(schedules).reduce((acc, cur) => {
              if (cur.repeatOn.includes(item?.format("dddd").toLowerCase())) {
                if (
                  item.isBefore(dayjs(cur?.endDate), "day") ||
                  item.isSame(dayjs(cur?.endDate), "day")
                ) {
                  acc.push({
                    ...cur,
                    startTime: cloneDeep(item)
                      .set("hour", dayjs(cur?.startTime).hour())
                      .set("minute", dayjs(cur?.startTime).minute()),
                  });
                  return acc;
                }
              }

              return acc;
            }, []);

            return (
              <SchedulerContentColumn
                date={item}
                key={item}
                listTimeRow={listTimeRow}
                listSchedules={listSchedules}
              />
            );
          })}
        </CommonStyles.Box>
        {/* <SchedulerContent headerList={headerList} listTimeRow={listTimeRow} /> */}
      </CommonStyles.Box>
    </SchedulerProvider>
  );
};

export default memo(CustomerScheduler);
