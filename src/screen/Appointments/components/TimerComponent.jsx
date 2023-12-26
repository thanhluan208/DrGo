import React, { useEffect, useRef, useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Timer from "../../../assets/icons/Timer";
import dayjs from "dayjs";

const TimerComponent = ({ startTime }) => {
  //! State
  const [time, setTime] = useState(startTime);
  const intervalRef = useRef(null);

  //! Function
  useEffect(() => {
    if (startTime > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1000);
      }, 1000);
    }
  }, [startTime]);

  //! Render
  if (startTime === 0)
    return (
      <CommonStyles.Box
        centered
        sx={{
          gap: "8px",
        }}
      >
        <Timer stroke={"#F2F9FF"} />
        <CommonStyles.Typography
          type="normal18"
          sx={{
            color: "#F2F9FF",
          }}
        >
          {dayjs(startTime).format("mm:ss")}
        </CommonStyles.Typography>
      </CommonStyles.Box>
    );

  return (
    <CommonStyles.Box
      centered
      sx={{
        gap: "8px",
      }}
    >
      <Timer stroke={"#FD4848"} />
      <CommonStyles.Typography
        type="normal18"
        sx={{
          color: "#FD4848",
        }}
      >
        {dayjs(time).format("mm:ss")}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default TimerComponent;
