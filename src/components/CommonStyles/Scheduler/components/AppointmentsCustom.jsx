import React, { memo, useCallback, useState } from "react";
import CommonStyles from "../..";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { useTheme } from "@emotion/react";
import { capitalize, isString } from "lodash";
import moment from "moment";
import AppointmentActionDialog from "./AppointmentActionDialog";
import dayjs from "dayjs";
import { useGet } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";
import useToggleDialog from "../../../../hooks/useToggleDialog";
import CommonIcons from "../../../CommonIcons";
import FirebaseServices from "../../../../services/firebaseServices";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const AppointmentsCustom = (props) => {
  //! State
  const theme = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const { style, data, onDoubleClick, forwardedRef, onClick, resources } =
    props;
  const { open, shouldRender, toggle: toggleConfirmDialog } = useToggleDialog();

  const { type, startDate, id } = data;
  const currentEditingAppointment = useGet(
    cachedKeys.APPOINTMENTS.CURRENT_EDITING_APPOINTMENT
  );
  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );

  const isEditing = currentEditingAppointment === id;
  //! Function

  const isStarted = dayjs(startDate).isBefore(dayjs());

  const handleDoubleClick = () => {
    if (isStarted) return;

    onDoubleClick && onDoubleClick();
  };

  const handleDeleteAppointment = useCallback(async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting appointment...", {
      autoClose: false,
    });

    try {
      await FirebaseServices.deleteAppointment(id);

      await refetchListAppointment();

      toast.update(toastId, {
        render: "Delete appointment successfully!",
        autoClose: 1000,
        type: "success",
        isLoading: false,
      });
      toggleConfirmDialog();
    } catch (error) {
      toast.update(toastId, {
        render: "Delete appointment failed!",
        autoClose: 1000,
        type: "error",
        isLoading: false,
      });
      toggleConfirmDialog();
    }
  }, []);

  //! Render
  const customButton = (toggle) => {
    return (
      <Appointments.Appointment
        className="appointment"
        forwardedRef={!isStarted || isDeleting ? forwardedRef : null}
        resources={resources}
        onClick={
          isDeleting
            ? null
            : (e) => {
                const nodeName = e.target.nodeName?.toLowerCase();
                if (
                  nodeName === "svg" ||
                  nodeName === "path" ||
                  nodeName === "button"
                ) {
                  return;
                } else {
                  toggle();
                }
              }
        }
        key={id}
        style={{
          ...style,
          backgroundColor: isEditing
            ? "transparent"
            : isStarted
            ? "#b3bac6"
            : "#F3F4F6",
          cursor: isStarted ? "unset" : "pointer",
          padding: isEditing ? 0 : "8px",
          borderRadius: "12px",
          borderLeft: isEditing
            ? "none"
            : `4px solid ${
                theme.colors.custom[
                  isString(type)
                    ? type.replace(" ", "").toLowerCase()
                    : "borderColor"
                ]
              }`,
          width: isEditing ? "0%" : "100%",
          animation: isEditing ? "" : "appear 0.8s ease-in-out ",
          overflow: "hidden",
          whiteSpace: "nowrap",
          opacity: isEditing ? 0 : 1,

          "@keyframes appear": {
            "0%": {
              opacity: 0,
              width: "0%",
            },
            "100%": {
              opacity: 1,
              width: "100%",
            },
          },
        }}
        onDoubleClick={handleDoubleClick}
      >
        {!isEditing && (
          <CommonStyles.Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              width: "100%",
              transform: "translateY(-5px)",
              height: "100%",

              "&:hover": {
                button: {
                  opacity: 1,
                },
              },
            }}
          >
            <CommonStyles.Box>
              <CommonStyles.Box sx={{ display: "flex", gap: "8px" }}>
                <CommonStyles.Typography type="normal14">
                  {props.data.patientName}
                </CommonStyles.Typography>
                {isDeleting && <CircularProgress />}
              </CommonStyles.Box>
              <CommonStyles.Typography type="normal14" color="secondaryText">
                {capitalize(props.data.type)}
              </CommonStyles.Typography>
            </CommonStyles.Box>

            {!isStarted && (
              <CommonStyles.Box>
                <CommonStyles.ConfirmDialog
                  title={"Confirmation"}
                  open={open}
                  toggle={toggleConfirmDialog}
                  shouldRender={shouldRender}
                  customButton={
                    <CommonStyles.IconButton
                      className="delete-appointment"
                      onClick={toggleConfirmDialog}
                      disabled={isStarted}
                      customSx={{
                        opacity: 0,
                      }}
                    >
                      <CommonIcons.Delete />
                    </CommonStyles.IconButton>
                  }
                  content={
                    <CommonStyles.Box>
                      <CommonStyles.Box>
                        <CommonStyles.Typography>
                          Are you sure you want to delete this appointment?
                        </CommonStyles.Typography>

                        <CommonStyles.Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "20px",
                          }}
                        >
                          <CommonStyles.Button
                            variant="outlined"
                            onClick={toggleConfirmDialog}
                          >
                            Cancel
                          </CommonStyles.Button>
                          <CommonStyles.Button
                            onClick={handleDeleteAppointment}
                            loading={isEditing}
                          >
                            Confirm
                          </CommonStyles.Button>
                        </CommonStyles.Box>
                      </CommonStyles.Box>
                    </CommonStyles.Box>
                  }
                />
              </CommonStyles.Box>
            )}
          </CommonStyles.Box>
        )}
      </Appointments.Appointment>
    );
  };

  return (
    <AppointmentActionDialog
      data={data}
      customButton={customButton}
      readOnly={isStarted}
    />
  );
};

export default memo(AppointmentsCustom);
