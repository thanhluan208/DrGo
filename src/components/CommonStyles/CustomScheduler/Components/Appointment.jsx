import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CommonStyles from "../..";
import { useTheme } from "@emotion/react";
import { useScheduler } from "./SchedulerProvider";
import { cloneDeep } from "lodash";
import { useGet } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";
import dayjs from "dayjs";

//* Duration in minutes
const minDuration = 30;

const Appointment = ({
  data,
  index,
  startDate,
  endDate,
  rowHeight,
  step,
  stepUnit,
  nextAppointmentStartDate,
}) => {
  //! State
  const theme = useTheme();
  const {
    startDate: dataStartDate,
    endDate: dataEndDate,
    id,
    patient,
    doctor,
  } = data;
  const { name: patientName, id: patientId } = patient;

  const [isDisabledDrag, setIsDisabledDrag] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { onChangeScheduler } = useScheduler();

  const isEditing = useGet(
    `${cachedKeys.APPOINTMENTS.PENDING_APPOINTMENT}_${id}`
  );

  const pxPerStep = useMemo(() => {
    return rowHeight / step;
  }, [rowHeight, step]);

  const position = useMemo(() => {
    const timeDiff = dataStartDate.diff(startDate, stepUnit);

    return {
      top: timeDiff * pxPerStep + rowHeight,
    };
  }, [
    rowHeight,
    startDate,
    dataStartDate,
    stepUnit,
    stepUnit,
    pxPerStep,
    rowHeight,
  ]);

  const appointmentHeight = useMemo(() => {
    const timeDiff = dataEndDate.diff(dataStartDate, stepUnit);

    return timeDiff * pxPerStep;
  }, [dataStartDate, dataEndDate, stepUnit, pxPerStep]);

  const appointmentIsPast = useMemo(() => {
    return dataStartDate.isBefore(dayjs());
  }, [dataStartDate]);

  const upperLimitHeight = useMemo(() => {
    if (!nextAppointmentStartDate) return null;
    const timeDiff = nextAppointmentStartDate.diff(dataStartDate, stepUnit);

    return timeDiff * pxPerStep;
  }, [nextAppointmentStartDate, pxPerStep, stepUnit, dataStartDate]);

  const lowerLimitHeight = useMemo(() => {
    return pxPerStep * minDuration;
  }, [pxPerStep, minDuration]);

  const dialogData = useMemo(() => {
    return {
      ...data,
      doctor: data?.doctor?.id,
      patient: {
        ...data?.patient,
        value: data?.patient?.id,
        label: data?.patient?.name || data?.patient?.id,
      },
    };
  }, [data]);

  //! Function
  const handleChangeSize = useCallback(
    (value, type) => {
      if (loading) {
        return;
      }
      const timeDiff = value / pxPerStep;

      const newEndDate = cloneDeep(dataStartDate).add(timeDiff, stepUnit);

      onChangeScheduler({ id, endDate: newEndDate }, setLoading);
    },
    [pxPerStep, loading]
  );

  //! Render

  if (
    dataStartDate.isBefore(startDate) ||
    dataStartDate.isAfter(endDate) ||
    isEditing
  ) {
    return null;
  }

  return (
    <Fragment>
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
                top: `${position.top || 0}px`,
                left: `${position?.left + 5 || 5}px`,
                transition: "height 0.5s ease",
                height: `${appointmentHeight}px`,
                width: "90%",
              }}
              ref={dropProvided.innerRef}
              {...dropProvided.droppableProps}
              onClick={(e) => {
                const target = e.target;

                if (target.classList.contains("resizeElm")) return;
                toggle();
              }}
            >
              <Draggable
                key={`drag_elm_${id}`}
                draggableId={`${id}_${dataStartDate.valueOf()}_${dataEndDate.valueOf()}`}
                index={index}
                isDragDisabled={isDisabledDrag || loading || appointmentIsPast}
              >
                {(dragProvided, dragSnapShot) => {
                  return (
                    <div
                      className={`appointmentContainer_${doctor?.id}`}
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      style={{
                        ...dragProvided.draggableProps.style,
                        // transition: "all 0.2s ease",
                        background: appointmentIsPast
                          ? theme.colors.custom.appointmentIsPast
                          : theme.colors.custom.appointmentBackground,

                        borderWidth: "0 0 0 4px",
                        borderRadius: "10px",
                        height: `${appointmentHeight}px`,
                        // position: !isDragging && "relative",
                        // left: "0",
                        // top: "0 ",
                      }}
                    >
                      <CommonStyles.ResizeWrapper
                        disabledLeft
                        disabledRight
                        disabledTop
                        disabledBottom={appointmentIsPast}
                        callbackMouseLeave={() => setIsDisabledDrag(false)}
                        callbackMouseOver={() => setIsDisabledDrag(true)}
                        loading={loading}
                        heightValue={appointmentHeight}
                        onChangeSize={handleChangeSize}
                        upperLimitHeight={upperLimitHeight}
                        lowerLimitHeight={lowerLimitHeight}
                      >
                        <CommonStyles.Box
                          sx={{
                            display: "flex",
                            paddingLeft: "8px",
                            animation: "fadeIn 0.5s ease-in-out",
                            width: "90%",

                            "@keyframes fadein": {
                              from: {
                                opacity: 0,
                                width: 0,
                              },
                              to: {
                                opacity: 1,
                                width: "90%",
                              },
                            },
                          }}
                        >
                          <CommonStyles.Typography
                            type="bold12"
                            sx={{
                              maxWidth: 150,
                              textWrap: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {patientName || `patient ${patientId}`}
                          </CommonStyles.Typography>
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
    </Fragment>
  );
};

export default Appointment;
