import React, { useMemo } from "react";
import CommonStyles from "../../../components/CommonStyles";
import TimerComponent from "./TimerComponent";
import CellActions from "./CellActions";
import { appointmentActionTypes } from "../../../constants/type";
import { createdByType, statusType } from "../../../constants/options";
const mockdata = [
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[3],
    timer: 320,
    action: appointmentActionTypes.EDIT,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
  {
    id: Math.random() * 100000,
    time: "8:00 - 8:30",
    patient: "John Doe",
    insurance: "AIA",
    visitedBefore: "Yes",
    doctor: "Dr. John Doe",
    Symptoms: "Headache",
    status: statusType[Math.floor(Math.random() * 2) + 1],
    timer: 0,
    createdBy: createdByType[Math.floor(Math.random() * 2) + 1],
  },
];

const TableAppointment = ({
  filters,
  handleSelectRow,
  handleChangeSort,
  handleSelectAll,
  handleChangePage,
  handleChangePageSize,
}) => {
  //! State

  const columns = useMemo(() => {
    return [
      {
        id: "time",
        title: "Time",
        width: 200,
        sortable: true,
      },
      {
        id: "patient",
        title: "Patient",
        width: 300,
      },
      {
        id: "insurance",
        title: "Insurance",
      },
      {
        id: "visitedBefore",
        title: "Visited before",
        width: 100,
      },
      {
        id: "doctor",
        title: "Doctor",
      },
      {
        id: "Symptoms",
        title: "Symptoms",
        width: 300,
      },
      {
        id: "createdBy",
        title: "Created By",
        renderContent: (props) => {
          return (
            <CommonStyles.IconButton>{props.createdBy}</CommonStyles.IconButton>
          );
        },
      },
      {
        id: "status",
        title: "Status",
      },
      {
        timer: "timer",
        title: "Timer",
        renderContent: (props) => {
          return (
            <TimerComponent
              startTime={!!props.timer ? props.timer * 1000 : 0}
            />
          );
        },
      },
      {
        id: "action",
        title: "Action",
        renderContent: (props) => {
          return (
            <CellActions
              type={props.action || appointmentActionTypes.VIEW}
              {...props}
            />
          );
        },
      },
    ];
  }, []);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        marginTop: "20px",
      }}
    >
      <CommonStyles.Table
        columns={columns}
        data={mockdata}
        hasCheckbox
        tableWidth={1500}
        filters={filters}
        handleChangeSort={handleChangeSort}
        handleSelectRow={handleSelectRow}
        handleSelectAll={handleSelectAll}
        handleChangePage={handleChangePage}
        handleChangePageSize={handleChangePageSize}
        totalPage={10}
      />
    </CommonStyles.Box>
  );
};

export default TableAppointment;
