import React from "react";
import CommonStyles from "../..";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { useTheme } from "@emotion/react";
import { capitalize, isString } from "lodash";

const AppointmentsCustom = (props) => {
  //! State
  const theme = useTheme();
  const { children, style, data, ...resprops } = props;
  const { type } = data;
  console.log("props", props);
  //! Function

  //! Render
  return (
    <Appointments.Appointment
      style={{
        ...style,
        backgroundColor: "#F3F4F6",
        padding: "8px",
        borderRadius: "12px",
        borderLeft: `4px solid ${
          theme.colors.custom[
            isString(type) ? type.replace(" ", "").toLowerCase() : "borderColor"
          ]
        }`,
      }}
      {...resprops}
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
