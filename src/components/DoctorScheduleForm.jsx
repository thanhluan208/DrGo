import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import CommonStyles from "./CommonStyles";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import schedulesModel from "../models/schedulesModel";
import FirebaseServices from "../services/firebaseServices";
import dayjs from "dayjs";
import useToggleDialog from "../hooks/useToggleDialog";
import { FastField, Form, Formik } from "formik";
import CustomFields from "../components/CustomFields";
import { cloneDeep } from "lodash";
import { ButtonType } from "./CommonStyles/Button";
import { useTheme } from "@mui/material";
import Add from "../assets/icons/Add";

import Update from "../assets/icons/Update";
import Delete from "../assets/icons/Delete";
import Fail from "../assets/icons/Fail";
import Success from "../assets/icons/Success";
import Warning from "../assets/icons/Warning";
import * as Yup from "yup";

const DoctorScheduleForm = ({ id, data, refecthListSchedules }) => {
  //! State
  const theme = useTheme();
  const initialValues = useMemo(() => {
    return {
      id: data?.id || "",
      startDate: data?.startDate || new Date(),
      endDate: data?.endDate || new Date(),
      startTime: data?.startTime || new Date(),
      endTime: data?.endTime || new Date(),
      repeatOn: data?.repeatOn || ["wednesday", "thursday"],
    };
  }, []);

  const {
    open: openSuccess,
    toggle: toggleSuccess,
    shouldRender: shouldRenderSuccess,
  } = useToggleDialog();

  const {
    open: openConfirm,
    toggle: toggleConfirm,
    shouldRender: shouldRenderConfirm,
  } = useToggleDialog();

  const {
    open: openFail,
    toggle: toggleFail,
    shouldRender: shouldRenderFail,
  } = useToggleDialog();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    startDate: Yup.date()
      .required(t("required", { field: "Start date" }))
      .test(
        "startDate",
        "Start date must be same or after today",
        function (value) {
          return (
            dayjs(value).isAfter(dayjs(), "day") ||
            dayjs(value).isSame(dayjs(), "day")
          );
        }
      )
      .test(
        "startDateBeforeEndDate",
        "Start date must be before end date",
        function (value) {
          return dayjs(value).isBefore(dayjs(this.parent.endDate));
        }
      ),
    endDate: Yup.date()
      .required(t("required", { field: "End date" }))
      .test(
        "endDate",
        "End date must be same or after today",
        function (value) {
          return (
            dayjs(value).isAfter(dayjs(), "day") ||
            dayjs(value).isSame(dayjs(), "day")
          );
        }
      )
      .test(
        "endDateAfterStartDate",
        "End date must be after start date",
        function (value) {
          return dayjs(value).isAfter(dayjs(this.parent.startDate));
        }
      ),
    startTime: Yup.date()
      .required(t("required", { field: "Start time" }))
      .test(
        "startTimeBeforeEndTime",
        "Start time must be before end time",
        function (value) {
          console.log(this.parent);
          return dayjs(value).isBefore(dayjs(this.parent.endTime));
        }
      ),
    endTime: Yup.date()
      .required(t("required", { field: "End time" }))
      .test(
        "endTimeAfterStartTime",
        "End time must be after start time",
        function (value) {
          return dayjs(value).isAfter(dayjs(this.parent.startTime));
        }
      ),
  });

  //! Function
  const handleCreate = async (values) => {
    const toastId = toast.loading(t("scheduleAction.creatingSchedule"), {
      autoClose: false,
    });
    try {
      // const requestPayload = schedulesModel.parseRequestActionSchedule(values);
      await FirebaseServices.createSchedule({
        ...values,
        doctor: id,
      });

      toggleSuccess();

      toast.update(toastId, {
        render: t("scheduleAction.createScheduleSuccessfully"),
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toggleFail();
      toast.update(toastId, {
        render: error?.message || t("scheduleAction.actionScheduleFailed"),
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleEdit = async (values) => {
    const toastId = toast.loading(t("scheduleAction.updatingSchedule"), {
      autoClose: false,
    });

    try {
      // const requestPayload = schedulesModel.parseRequestActionSchedule(values);
      await FirebaseServices.updateSchedule(values);

      toggleSuccess();
      toast.update(toastId, {
        render: t("scheduleAction.updateScheduleSuccessfully"),
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log("error", error);
      toggleFail();
      toast.update(toastId, {
        render: error?.message || t("scheduleAction.actionScheduleFailed"),
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (values) => {
    if (data) {
      handleEdit(values);
      return;
    }
    handleCreate(values);
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting schedule...", {
      autoClose: false,
    });

    try {
      await FirebaseServices.deleteSchedule(data?.id);

      await refecthListSchedules();

      toast.update(toastId, {
        render: "Delete schedule successfully",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });

      toggleConfirm();
    } catch (error) {
      toast.update(toastId, {
        render: error?.message || "Delete schedule failed",
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  //! Render
  const renderFooter = useCallback(
    (isSubmitting) => {
      if (data) {
        return (
          <CommonStyles.Box
            sx={{
              display: "flex",
              gap: "17px",
              marginTop: "62px",
            }}
          >
            <CommonStyles.Button
              buttonType={ButtonType.PRIMARY}
              type="submit"
              loading={isSubmitting}
            >
              <Update fill={"#fff"} />
              <CommonStyles.Typography type="normal20" sx={{ color: "#fff" }}>
                {t("scheduleAction.update")}
              </CommonStyles.Typography>
            </CommonStyles.Button>

            <CommonStyles.Button
              buttonType={ButtonType.UNACTIVE}
              type="button"
              loading={isSubmitting}
              sx={{
                height: "55px",
              }}
              onClick={toggleConfirm}
            >
              <Delete fill={"#fff"} />
              <CommonStyles.Typography type="normal20" sx={{ color: "#fff" }}>
                {t("scheduleAction.delete")}
              </CommonStyles.Typography>
            </CommonStyles.Button>
          </CommonStyles.Box>
        );
      }

      return (
        <CommonStyles.Box>
          <CommonStyles.Button
            buttonType={ButtonType.PRIMARY}
            sx={{ marginTop: "62px" }}
            type="submit"
            loading={isSubmitting}
          >
            <Add fill={"#fff"} />
            <CommonStyles.Typography type="normal20" sx={{ color: "#fff" }}>
              {t("scheduleAction.create")}
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    },
    [data, toggleConfirm]
  );

  return (
    <Fragment>
      <CommonStyles.Box
        sx={{
          borderRadius: "50px",
          border: "1px solid #CCC",
          padding: "32px 65px",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {({ values, setFieldValue, isSubmitting }) => {
            const repeatOn = values.repeatOn;
            return (
              <Form>
                <CommonStyles.Box
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    gap: "41px",
                  }}
                >
                  <CommonStyles.Box sx={{ display: "flex" }}>
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        color: "#000",
                        marginRight: "18px",
                      }}
                    >
                      {t("scheduleAction.date")}
                    </CommonStyles.Typography>
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        marginRight: "12px",
                      }}
                    >
                      From
                    </CommonStyles.Typography>
                    <FastField
                      name="startDate"
                      component={CustomFields.DatePicker}
                      sxContainer={{
                        marginRight: "18px",
                        width: 178,
                        input: {
                          paddingRight: 0,
                        },
                      }}
                      format="MMM DD, YYYY"
                    />
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        marginRight: "12px",
                      }}
                    >
                      To
                    </CommonStyles.Typography>
                    <FastField
                      name="endDate"
                      component={CustomFields.DatePicker}
                      sxContainer={{
                        width: 178,
                        input: {
                          paddingRight: 0,
                        },
                      }}
                      format="MMM DD, YYYY"
                    />
                  </CommonStyles.Box>

                  <CommonStyles.Box sx={{ display: "flex" }}>
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        color: "#000",
                        marginRight: "18px",
                      }}
                    >
                      {t("scheduleAction.time")}
                    </CommonStyles.Typography>
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        marginRight: "12px",
                      }}
                    >
                      From
                    </CommonStyles.Typography>
                    <FastField
                      name="startTime"
                      component={CustomFields.TimePicker}
                      sxContainer={{
                        marginRight: "18px",
                        width: 178,
                        input: {
                          paddingRight: 0,
                        },
                      }}
                      format="HH:mm"
                    />
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        marginRight: "12px",
                      }}
                    >
                      To
                    </CommonStyles.Typography>
                    <FastField
                      name="endTime"
                      component={CustomFields.TimePicker}
                      sxContainer={{
                        width: 178,
                        input: {
                          paddingRight: 0,
                        },
                      }}
                      format="HH:mm"
                    />
                  </CommonStyles.Box>

                  <CommonStyles.Box>
                    <CommonStyles.Typography
                      type="normal15"
                      sx={{
                        color: "#000",
                      }}
                    >
                      {t("scheduleAction.repeatOn")}
                    </CommonStyles.Typography>

                    <CommonStyles.Box
                      sx={{
                        display: "flex",
                        gap: "31px",
                        marginTop: "24px",
                      }}
                    >
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((item) => {
                        const isSelected = repeatOn.includes(
                          item.toLowerCase()
                        );

                        return (
                          <CommonStyles.Button
                            key={`${item}_${data?.id}`}
                            variant="text"
                            sx={{
                              padding: "10px 20px",
                              border: "1px solid #C8C8C8",
                              width: 110,
                              borderRadius: "50px",
                              background: isSelected
                                ? theme.palette.primary.main
                                : "transparent",
                              transition: "all 0.3s ease-in-out",
                              "&:hover": {
                                background: isSelected
                                  ? theme.palette.primary.main
                                  : "transparent",
                              },
                            }}
                            onClick={() => {
                              if (isSelected) {
                                const nextRepeatOn = cloneDeep(repeatOn).filter(
                                  (selectedRepeatOn) =>
                                    item.toLowerCase() !==
                                    selectedRepeatOn.toLowerCase()
                                );
                                setFieldValue("repeatOn", nextRepeatOn);
                                return;
                              }
                              setFieldValue("repeatOn", [
                                ...repeatOn,
                                item.toLowerCase(),
                              ]);
                            }}
                          >
                            <CommonStyles.Typography
                              type="normal15"
                              sx={{
                                color: isSelected ? "#fff" : "#C8C8C8",
                              }}
                            >
                              {item}
                            </CommonStyles.Typography>
                          </CommonStyles.Button>
                        );
                      })}
                    </CommonStyles.Box>
                  </CommonStyles.Box>
                </CommonStyles.Box>

                {renderFooter()}
              </Form>
            );
          }}
        </Formik>
      </CommonStyles.Box>
      {shouldRenderSuccess && (
        <CommonStyles.Dialog
          open={openSuccess}
          handleClose={toggleSuccess}
          dialogContent={
            <CommonStyles.NotificationDialog
              toggle={toggleSuccess}
              icon={<Success />}
              text={
                data
                  ? t("scheduleAction.updateScheduleSuccessfully")
                  : t("scheduleAction.createScheduleSuccessfully")
              }
            />
          }
          maxWidth="lg"
          PaperProps={{
            sx: {
              borderRadius: "50px",
            },
          }}
          sx={{
            borderRadius: "50px",
          }}
        />
      )}

      {shouldRenderFail && (
        <CommonStyles.Dialog
          open={openFail}
          handleClose={toggleFail}
          dialogContent={
            <CommonStyles.NotificationDialog
              toggle={toggleFail}
              icon={<Fail />}
              text={t("scheduleAction.actionScheduleFailed")}
            />
          }
          maxWidth="lg"
          PaperProps={{
            sx: {
              borderRadius: "50px",
            },
          }}
          sx={{
            borderRadius: "50px",
          }}
        />
      )}

      {shouldRenderConfirm && (
        <CommonStyles.Dialog
          open={openConfirm}
          handleClose={toggleConfirm}
          dialogContent={
            <CommonStyles.NotificationDialog
              toggle={toggleConfirm}
              icon={<Warning />}
              text={"Are you sure you want to delete this schedule?"}
              confirmCallback={() => {
                handleDelete();
              }}
            />
          }
          maxWidth="lg"
          PaperProps={{
            sx: {
              borderRadius: "50px",
            },
          }}
          sx={{
            borderRadius: "50px",
          }}
        />
      )}
    </Fragment>
  );
};

export default DoctorScheduleForm;
