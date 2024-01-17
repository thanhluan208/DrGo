import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CommonStyles from "../..";

const Appointment = ({ data, index }) => {
  //! State
  const { time, id } = data;

  //! Function
  console.log("hehe", time);

  //! Render

  return (
    <Droppable
      key={`drop_destination_${id}`}
      droppableId={`drop_destination_${id}`}
      isDropDisabled={true}
    >
      {(dropProvided, dropSnapshot) => {
        return (
          <div
            style={{
              height: "80px",
              border: "solid 1px #ccc",
              position: "absolute",
              top: "0",
              left: "0",
            }}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            <Draggable
              key={`drag_elm_${id}`}
              draggableId={`drag_elm_${id}`}
              index={index}
            >
              {(dragProvided, dragSnapShot) => {
                return (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <CommonStyles.Box
                      centered
                      sx={{
                        height: "80px",
                        width: "200px",
                        borderRadius: "10px",
                        border: "solid 1px #ccc",
                      }}
                    >
                      drag element 1: {time.format("HH:mm")}
                    </CommonStyles.Box>
                  </div>
                );
              }}
            </Draggable>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Appointment;
