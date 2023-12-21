import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { Paper } from "@mui/material";
import AppointmentsCustom from "./components/AppointmentsCustom";
import CommonStyles from "..";
import { useTheme } from "@emotion/react";
import moment from "moment";
import TimeScaleLabelComponent from "./components/TimeScaleLabelComponent";
import TimeTableCellComponent from "./components/TimeTableCellComponent";
import GroupingCellComponent from "./components/GroupingCellComponent";
import { appointments } from "../../../assets/mockdata";

const Scheduler = ({
  addedAppointment,
  resources,
  grouping,
  handleChangeScheduler,
  onCommitButtonClick,
}) => {
  //! State
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(appointments);

  //! Function
  const handleAdd = () => {
    setData((prev) => [
      ...prev,
      {
        id: 1000,
        customer: "Taeyeon's Husband",
        pst: [1],
        startDate: moment("2023-12-20 14:00:00"),
        endDate: moment("2023-12-20 15:30:00"),
        type: "checked in",
      },
    ]);
  };

  useLayoutEffect(() => {
    const indicator = document.getElementsByClassName("indicator");
    if (indicator[0]) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("first_indicator");
      indicator[0].appendChild(newDiv);
    }
    setVisible(false);
  }, []);

  //! Render
  if (!data || !resources || !grouping) return null;

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
        // ".OverlayContainer-container": {
        //   display: "none",
        // },
        borderBottom: `1px solid ${theme.colors.custom.borderColor}`,
        boxShadow: "none",
        overflow: "hidden",
        maxWidth: "100vw",
      }}
    >
      <SchedulerComponent data={data} height={800}>
        <ViewState defaultCurrentDate={moment().format("YYYY-MM-DD")} />
        <EditingState
          onCommitChanges={handleChangeScheduler}
          preCommitChanges={(changes, appointment, addAppointment) => {
            console.log("changes", {
              changes,
              appointment,
              addAppointment,
            });
          }}
          onAppointmentChangesChange={(changes) => {
            console.log("changes", changes);
          }}
          onAddedAppointmentChange={(appointments) => {
            console.log("asdas", appointments);
          }}
          defaultAddedAppointment={{ addedAppointment }}
          defaultEditingAppointment={{ addedAppointment }}
          addedAppointment={{ addedAppointment }}
        />
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
          cellComponent={(props) => <GroupingCellComponent {...props} />}
        />
      </SchedulerComponent>
      <CommonStyles.Button onClick={handleAdd}>add</CommonStyles.Button>
    </Paper>
  );
};

export default memo(Scheduler);