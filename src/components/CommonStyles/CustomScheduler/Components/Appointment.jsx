import React, { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CommonStyles from "../..";

const Appointment = ({
  data,
  index,
  startDate,
  endDate,
  rowHeight,
  step,
  stepUnit,
}) => {
  //! State
  const { time, id } = data;
  const [isDisabledDrage, setIsDisabledDrage] = React.useState(false);

  const position = useMemo(() => {
    const timeDiff = time.diff(startDate, stepUnit);
    const pxPerMinute = rowHeight / step;

    return timeDiff * pxPerMinute;
  }, [rowHeight, startDate, time, stepUnit, stepUnit]);

  //! Function
  console.log("time", {
    position,
  });

  //! Render

  if (time.isBefore(startDate) || time.isAfter(endDate)) {
    return null;
  }

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
              position: "absolute",
              top: `${position}px`,
              left: "0",
              width: "200px",
              borderRadius: "10px",
              border: "solid 1px #ccc",
            }}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            <Draggable
              key={`drag_elm_${id}`}
              draggableId={`drag_elm_${id}`}
              index={index}
              isDragDisabled={isDisabledDrage}
            >
              {(dragProvided, dragSnapShot) => {
                return (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <CommonStyles.ResizeWrapper
                      disabledLeft
                      disabledRight
                      disabledTop
                      callbackMouseLeave={() => setIsDisabledDrage(false)}
                      callbackMouseOver={() => setIsDisabledDrage(true)}
                    >
                      <CommonStyles.Box centered>
                        drag element 1: {time.format("HH:mm")}
                      </CommonStyles.Box>
                    </CommonStyles.ResizeWrapper>
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
