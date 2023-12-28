import React, { Fragment, memo, useCallback, useMemo } from "react";
import CommonStyles from "../..";
import { DayView } from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import { useGet } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";
import AppointmentActionDialog from "./AppointmentActionDialog";
import { useTheme } from "@emotion/react";
import dayjs from "dayjs";

const TimeTableCellComponent = (props) => {
  //! State
  const theme = useTheme();
  const { startDate, endDate, groupingInfo, isShaded } = props;
  const hasDashedBorder = moment(startDate).format("mm").includes("00");
  const ableToSchedule = dayjs(startDate).isBefore(dayjs().add(-30, "minute"));

  const data = useMemo(() => {
    const { id } = groupingInfo[0];
    return {
      endDate,
      startDate,
      doctor: [id],
    };
  }, [startDate, endDate, groupingInfo]);

  //! Function

  //! Render
  const renderCell = useCallback((toggle) => {
    return (
      <DayView.TimeTableCell
        {...props}
        style={{
          borderBottom: hasDashedBorder
            ? "1px dashed #e8e8e8"
            : "1px solid #e8e8e8",
          background: ableToSchedule ? "#ccc" : "#fff",
          cursor: ableToSchedule ? "unset" : "pointer",
        }}
        onClick={!ableToSchedule ? toggle : undefined}
      />
    );
  }, []);

  return (
    <Fragment>
      <AppointmentActionDialog data={data} customButton={renderCell} />
    </Fragment>
  );
};

export default memo(TimeTableCellComponent);
