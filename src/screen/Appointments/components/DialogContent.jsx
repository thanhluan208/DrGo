import React, { memo, useCallback, useMemo } from "react";
import Close from "../../../assets/icons/Close";
import { useTranslation } from "react-i18next";
import CommonStyles from "../../../components/CommonStyles";
import { FastField, Form, Formik } from "formik";
import dayjs from "dayjs";
import CustomFields from "../../../components/CustomFields";
import { useTheme } from "@mui/material";
import * as Yup from "yup";
import { statusOptions } from "../../../constants/options";
import SelectPatient from "./SelectPatient";
import SelectDoctor from "./SelectDoctor";
import appointmentModel from "../../../models/appointmentsModel";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";

const DialogContent = ({ toggle, data }) => {
  //! State
  const theme = useTheme();
  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );

  const { t } = useTranslation();
  const initialValues = useMemo(() => {
    return {
      patient: data
        ? {
            ...data?.patient,
            value: data?.patient?.id,
            label: data?.patient?.name || `Patient ${data?.patient?.id}`,
          }
        : undefined,
      doctor: data?.doctor || "",
      email: data?.email || "",
      date: data?.date || new Date(),
      timeFrom: data?.timeFrom || new Date(),
      timeTo: data?.timeTo || new Date(),
      number: data?.number || 0,
      injure: data?.injure || "",
      status: data?.status || "",
    };
  }, [data]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      patient: Yup.object().test(
        "required",
        t("required", { field: t("patients") }),
        function (patient) {
          return !!patient?.value;
        }
      ),
      doctor: Yup.string().required(
        t("required", { field: t("appointment.doctor") })
      ),
      email: Yup.string().required(
        t("required", { field: t("appointment.email") })
      ),
      date: Yup.date()
        .required(t("required", { field: t("appointment.date") }))
        .test("date", t("appointment.dateNotInPast"), function (value) {
          return !dayjs(value).startOf("day").isAfter(dayjs().startOf("day"));
        }),
      timeFrom: Yup.date()
        .required(t("required", { field: t("appointment.timeFrom") }))
        .test("timeFrom", t("appointment.timeFromNotInPast"), function (value) {
          return dayjs(value).isAfter(dayjs());
        })
        .test(
          "timeFromBeforeTimeTo",
          t("appointment.timeFromBeforeTimeTo"),
          function (value) {
            return dayjs(value).isBefore(dayjs(this.parent.timeTo));
          }
        ),
      timeTo: Yup.date()
        .required(t("required", { field: t("appointment.timeTo") }))
        .test("timeTo", t("appointment.timeToNotInPast"), function (value) {
          return dayjs(value).isAfter(dayjs());
        })
        .test(
          "timeToAfterTimeFrom",
          t("appointment.timeToAfterTimeFrom"),
          function (value) {
            return dayjs(value).isAfter(dayjs(this.parent.timeFrom));
          }
        ),
      number: Yup.string()
        .required(t("required", { field: t("appointment.number") }))
        .test("isNumber", t("appointment.numberIsNumber"), function (value) {
          return !isNaN(value);
        }),
      // injure: Yup.string().required(
      //   t("required", { field: t("appointment.injure") })
      // ),
    });
  }, []);

  //! Function
  const onSubmit = useCallback(async (value) => {
    if (data) {
      await handleEdit(value);
      return;
    }

    await handleCreate(value);
  }, []);

  const handleCreate = useCallback(
    async (value) => {
      const toastId = toast.loading("Creating appointment...", {
        isLoading: true,
        autoClose: false,
      });
      try {
        const resquestCreate =
          appointmentModel.parseRequestCreateAppointment(value);

        await FirebaseServices.createAppointment(resquestCreate);

        await refetchListAppointment();

        toast.update(toastId, {
          render: "Create appointment successfully",
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          isLoading: false,
        });
      } catch (error) {
        console.log("err", error);
        toast.update(toastId, {
          render: "Create appointment failed",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          isLoading: false,
        });
      }
    },
    [refetchListAppointment]
  );

  //! Render

  return (
    <CommonStyles.Box
      sx={{
        padding: "12px 24px 39px 24px",
        width: 500,
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItmes: "center",
        }}
      >
        <CommonStyles.Box centered>
          <CommonStyles.Typography
            type="bold20"
            sx={{
              color: "#25282B",
            }}
          >
            {t("appointment.addNewAppointment")}
          </CommonStyles.Typography>
        </CommonStyles.Box>

        <CommonStyles.IconButton onClick={toggle}>
          <CommonStyles.Box
            sx={{
              padding: "12px",
            }}
          >
            <Close />
          </CommonStyles.Box>
        </CommonStyles.IconButton>
      </CommonStyles.Box>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        validateOnMount
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <SelectPatient />

                <FastField
                  name="status"
                  component={CustomFields.SelectField}
                  options={statusOptions}
                  label={t("appointment.status")}
                  fullWidth
                />

                <SelectDoctor />

                <FastField
                  name="email"
                  component={CustomFields.TextField}
                  label={t("appointment.email")}
                  fullWidth
                />

                <FastField
                  name="date"
                  component={CustomFields.DatePicker}
                  label={t("appointment.date")}
                  fullWidth
                />

                <CommonStyles.Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <FastField
                    component={CustomFields.TimePicker}
                    name="timeFrom"
                    label={t("appointment.timeFrom")}
                    fullWidth
                  />
                  <FastField
                    component={CustomFields.TimePicker}
                    name="timeTo"
                    label={t("appointment.timeTo")}
                    fullWidth
                  />
                </CommonStyles.Box>

                <FastField
                  component={CustomFields.TextField}
                  name="number"
                  label={t("appointment.number")}
                  fullWidth
                  type="number"
                />

                <FastField
                  component={CustomFields.TextField}
                  name="injure"
                  label={t("appointment.injure")}
                  fullWidth
                  type="injure"
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  marginTop: "32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CommonStyles.Button
                  loading={isSubmitting}
                  variant="outlined"
                  color="error"
                  sx={{
                    padding: "15px 24px",
                    borderRadius: "8px",
                  }}
                >
                  <CommonStyles.Typography
                    type="normal14"
                    sx={{
                      color: theme.palette.primary.error,
                    }}
                  >
                    {t("appointment.cancel")}
                  </CommonStyles.Typography>
                </CommonStyles.Button>
                <CommonStyles.Button
                  loading={isSubmitting}
                  sx={{
                    padding: "15px 24px",
                    borderRadius: "8px",
                    boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
                  }}
                  type="submit"
                >
                  <CommonStyles.Typography
                    type="normal14"
                    sx={{
                      color: theme.colors.white,
                    }}
                  >
                    {t("appointment.save")}
                  </CommonStyles.Typography>
                </CommonStyles.Button>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default memo(DialogContent);
