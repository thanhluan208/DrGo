import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler as SchedulerComponent,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
  AppointmentForm,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { teal, indigo } from "@mui/material/colors";
import { Paper } from "@mui/material";
import AppointmentsCustom from "./components/AppointmentsCustom";
import CommonStyles from "..";
import { PST } from "../../../assets/mockdata";
import { useTheme } from "@emotion/react";
import UnknownAvatar from "./components/Unknown.jpg";
import moment from "moment";
import TimeScaleLabelComponent from "./components/TimeScaleLabelComponent";
import TimeTableCellComponent from "./components/TimeTableCellComponent";

const grouping = [
  {
    resourceName: "pst",
  },
];

const appointments = [
  {
    id: 0,
    customer: "Robert Fox",
    pst: [1],
    startDate: moment("2023-12-20 08:30:00"),
    endDate: moment("2023-12-20 10:30:00"),
    type: "checked out",
  },
  {
    id: 1,
    customer: "Cody Fisher",
    pst: [4],
    startDate: moment("2023-12-20 11:00:00"),
    endDate: moment("2023-12-20 12:30:00"),
    type: "checked in",
  },
  {
    id: 4,
    customer: "Cameron Williamson",
    pst: [3],
    startDate: moment("2023-12-20 13:00:00"),
    endDate: moment("2023-12-20 14:30:00"),
    type: "confirmed",
  },
  {
    id: 2,
    customer: "Daisy Phillips",
    pst: [2],
    startDate: moment("2023-12-20 15:00:00"),
    endDate: moment("2023-12-20 16:30:00"),
    type: "scheduled",
  },
  {
    id: 3,
    customer: "Leah Curtis",
    pst: [2],
    startDate: moment("2023-12-20 23:00:00"),
    endDate: moment("2023-12-20 10:30:00"),
    type: "none",
  },
];

const resources = [
  {
    fieldName: "pst",
    title: "pst",
    instances: PST,
    allowMultiple: true,
  },
];

const Scheduler = () => {
  //! State
  const [data, setData] = React.useState(appointments);
  const theme = useTheme();

  //! Function
  useLayoutEffect(() => {
    const indicator = document.getElementsByClassName("indicator");
    if (indicator) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("first_indicator");
      indicator[0].appendChild(newDiv);
    }
  }, []);

  //! Render
  return (
    <Paper
      sx={{
        "& .MuiTable-root": {
          borderCollapse: "unset",
        },
        "& .TicksLayout-table": {
          display: "none",
        },
        "& .Label-emptyLabel:first-child": {
          height: "48px !important",
          position: "relative",
          borderBottom: "none",
          "&:after": {
            content: '"08:00"',
            position: "absolute",
            height: "100%",
            width: "100%",
            top: "0",
            right: "0px",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            fontFamily: "'Noto Sans', sans-serif",
          },
        },
        borderBottom: `1px solid ${theme.colors.custom.borderColor}`,
        boxShadow: "none",
        overflow: "hidden",
        maxWidth: "100vw",
      }}
    >
      <SchedulerComponent data={data} height={800}>
        <ViewState defaultCurrentDate={moment().format("YYYY-MM-DD")} />
        <EditingState />
        <GroupingState grouping={grouping} />

        <DayView
          startDayHour={8}
          endDayHour={24}
          intervalCount={1}
          cellDuration={30}
          dayScaleCellComponent={(props) => {
            return null;
          }}
          dayScaleEmptyCellComponent={(props) => {
            return (
              <CommonStyles.Typography
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  paddingRight: "5px",
                }}
              >
                PST
              </CommonStyles.Typography>
            );
          }}
          timeScaleLabelComponent={(props) => (
            <TimeScaleLabelComponent {...props} />
          )}
          // timeTableCellComponent={(props) => {
          //   console.log("props", props);
          //   return null;
          // }}
          timeTableCellComponent={(props) => (
            <TimeTableCellComponent {...props} />
          )}
        />

        <Appointments appointmentComponent={AppointmentsCustom} />

        <Resources data={resources} />

        <IntegratedGrouping />
        <IntegratedEditing />
        <DragDropProvider />

        <CurrentTimeIndicator
          shadePreviousCells={true}
          shadePreviousAppointments={true}
          updateInterval={1000}
          indicatorComponent={(props, index) => {
            return (
              <CommonStyles.Box
                className="indicator"
                sx={{
                  position: "absolute",
                  background: "red",
                  top: props.top,
                  height: "1px",
                  width: "100%",
                  zIndex: "100",
                  ".first_indicator": {
                    position: "absolute",
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    background: "red",
                    top: "-5px",
                    left: "-5px",
                  },
                }}
              ></CommonStyles.Box>
            );
          }}
        />
        <GroupingPanel
          cellComponent={({ group, ...restProps }) => {
            const infoPST = JSON.parse(group.text);
            return (
              <td
                {...restProps}
                key={`${group.fieldName}_${group.id}`}
                style={{
                  borderRight:
                    group.id === 4
                      ? "none"
                      : `1px solid ${theme.colors.custom.borderColor}`,
                }}
              >
                <CommonStyles.Box
                  sx={{
                    height: "48px",
                    padding: "0 12px 12px 12px",
                    display: "flex",
                    gap: "18px",
                  }}
                >
                  <CommonStyles.Avatar
                    src={infoPST.avatar}
                    alt={infoPST.name}
                  />
                  <CommonStyles.Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CommonStyles.Typography
                      type="bold14"
                      sx={{
                        maxWidth: `${
                          (window.innerWidth - 80) / 4 - 12 - 40 - 18 - 30
                        }px`,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {infoPST.name}
                    </CommonStyles.Typography>
                    <CommonStyles.Typography
                      type="normal14"
                      color="secondaryText"
                      sx={{
                        maxWidth: `${
                          (window.innerWidth - 80) / 4 - 12 - 40 - 18 - 30
                        }px`,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {infoPST.title}
                    </CommonStyles.Typography>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </td>
            );
          }}
        />

        <AppointmentTooltip showOpenButton />
        <AppointmentForm />
      </SchedulerComponent>
    </Paper>
  );
};

export default Scheduler;
