import React, { useCallback, useMemo, useState } from "react";
import CommonStyles from "..";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dayjs from "dayjs";
import TimeCell from "./Components/TimeCell";
import Appointment from "./Components/Appointment";

const CustomerScheduler = ({
  startDate = dayjs().startOf("day").add(8, "hour"),
  endDate = dayjs().startOf("day").add(20, "hour"),
  step = 30,
  stepUnit = "minute",
  rowHeight = 80,
  appointments = [
    {
      id: Math.random(),
      time: dayjs().startOf("day").add(12, "hour"),
    },
    {
      id: Math.random(),
      time: dayjs().startOf("day").add(13, "hour"),
    },
  ],
}) => {
  //! State
  // const [appointmentList, setAppointmentList] = useState(appointments);
  const listTimeRow = useMemo(() => {
    const list = [];
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    for (let i = start; i.isBefore(end); i = i.add(step, stepUnit)) {
      list.push(i.format("HH:mm"));
    }

    list.push(end.format("HH:mm"));

    return list;
  }, [startDate, endDate]);

  //! Function
  const handleDragEnd = useCallback((result, provider) => {
    console.log("on drag end", {
      result,
      provider,
    });
  }, []);

  //! Render

  return (
    <CommonStyles.Box sx={{ display: "flex" }}>
      <TimeCell listTimeRow={listTimeRow} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <CommonStyles.Box
          sx={{
            width: "100%",
            display: "grid",
            // gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <CommonStyles.Box
            centered
            sx={{
              flexDirection: "column",
              position: "relative",
            }}
          >
            {appointments.map((elm, index) => {
              return (
                <Appointment
                  data={elm}
                  index={index}
                  startDate={startDate}
                  endDate={endDate}
                  rowHeight={rowHeight}
                  step={step}
                  stepUnit={stepUnit}
                />
              );
            })}
            {listTimeRow.map((time, index) => {
              return (
                <Droppable
                  key={`drop_destination_${time}`}
                  droppableId={`drop_destination_${time}`}
                  index={index}
                >
                  {(dropProvided, dropSnapshot) => {
                    return (
                      <div
                        style={{
                          height: rowHeight,
                          border: "solid 1px #ccc",
                          width: "100%",
                        }}
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                      ></div>
                    );
                  }}
                </Droppable>
              );
            })}
          </CommonStyles.Box>
        </CommonStyles.Box>
      </DragDropContext>
    </CommonStyles.Box>
  );
};

export default CustomerScheduler;
