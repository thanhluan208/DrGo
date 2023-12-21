import React from "react";
import CommonStyles from "../..";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { useTheme } from "@emotion/react";
import { capitalize, isString } from "lodash";
import moment from "moment";

const AppointmentsCustom = (props) => {
  //! State
  const theme = useTheme();
  const {
    children,
    style,
    data,
    onDoubleClick,
    isShaded,
    forwardedRef,
    onClick,
    resources,
  } = props;
  const { type, startDate } = data;
  //! Function

  const isStarted = moment(startDate).isBefore(moment());

  const handleDoubleClick = () => {
    console.log("go here");
    if (isStarted) return;

    onDoubleClick && onDoubleClick();
  };

  //! Render
  return (
    <Appointments.Appointment
      draggable={!isStarted}
      forwardedRef={!isStarted ? forwardedRef : null}
      resources={resources}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: isStarted ? "#b3bac6" : "#F3F4F6",
        cursor: isStarted ? "unset" : "pointer",
        padding: "8px",
        borderRadius: "12px",
        borderLeft: `4px solid ${
          theme.colors.custom[
            isString(type) ? type.replace(" ", "").toLowerCase() : "borderColor"
          ]
        }`,
      }}
      onDoubleClick={handleDoubleClick}
    >
      <CommonStyles.Box>
        <CommonStyles.Typography type="normal14">
          {props.data.customer}
        </CommonStyles.Typography>
        <CommonStyles.Typography type="normal14" color="secondaryText">
          {capitalize(props.data.type)}
        </CommonStyles.Typography>
      </CommonStyles.Box>
      {/* {children} */}
    </Appointments.Appointment>
  );
};

export default AppointmentsCustom;
