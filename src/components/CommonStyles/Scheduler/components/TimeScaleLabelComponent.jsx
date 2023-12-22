import React from "react";
import CommonStyles from "../..";
import moment from "moment";

const TimeScaleLabelComponent = (props) => {
  //! State
  const { time } = props;
  const shouldShow = moment(time).format("mm").includes("00");

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className={!time && "Label-emptyLabel"}
      sx={{
        width: "40px",
        height: "48px",
        borderBottom: shouldShow ? "none" : "1px solid #E0E0E0",
      }}
      time={time}
      {...props}
    >
      <CommonStyles.Typography type="normal14">
        {time && shouldShow ? moment(time).format("HH:mm") : ""}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default TimeScaleLabelComponent;
