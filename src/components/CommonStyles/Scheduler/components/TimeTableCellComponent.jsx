import React, { memo } from "react";
import CommonStyles from "../..";
import { DayView } from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";

const TimeTableCellComponent = (props) => {
  //! State
  const { startDate } = props;
  const hasDashedBorder = moment(startDate).format("mm").includes("00");

  //! Function

  //! Render
  return (
    // <CommonStyles.Box>
    <DayView.TimeTableCell
      {...props}
      onDoubleClick={() => {
        console.log("hehe");
      }}
      style={{
        borderBottom: hasDashedBorder
          ? "1px dashed #e8e8e8"
          : "1px solid #e8e8e8",
        background: "#fff",
      }}
    />
    // </CommonStyles.Box>
  );
};

export default memo(TimeTableCellComponent);
