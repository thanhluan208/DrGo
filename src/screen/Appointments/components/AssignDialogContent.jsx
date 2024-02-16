import React, { useMemo } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Close from "../../../assets/icons/Close";
import { FastField, Form, Formik } from "formik";
import CustomField from "../../../components/CustomFields";
import SelectDoctor from "./SelectDoctor";
import { ButtonType } from "../../../components/CommonStyles/Button";
import { useTheme } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";
import appointmentModel from "../../../models/appointmentsModel";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import { isEmpty } from "lodash";

const Detail = ({ title, content }) => {
  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommonStyles.Typography
        type="normal16"
        sx={{
          color: "#000",
          fontWeight: 500,
        }}
      >
        {title}
      </CommonStyles.Typography>
      <CommonStyles.Typography type="normal14">
        {content || "--"}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

const AssignDialogContent = ({ toggle, data, setLoading }) => {
  //! State
  const theme = useTheme();
  const { t } = useTranslation();
  const { patient, symptoms, id } = data;
  const { name, phone_number, email, device_tokens } = patient;

  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );

  const initialValues = useMemo(() => {
    return {
      date: data?.startDate || new Date(),
      timeFrom: data?.timeFrom || new Date(),
      timeTo: data?.timeTo || new Date(),
      doctor: data?.doctor?.id || "",
    };
  }, [data]);

  const validationSchema = Yup.object().shape({
    timeFrom: Yup.date()
      .required(t("required", { field: t("appointment.timeFrom") }))
      .test("timeFrom", t("appointment.timeFromNotInPast"), function (value) {
        return dayjs(value).isAfter(dayjs(), "hour");
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
        return dayjs(value).isAfter(dayjs(), "hour");
      })
      .test(
        "timeToAfterTimeFrom",
        t("appointment.timeToAfterTimeFrom"),
        function (value) {
          return dayjs(value).isAfter(dayjs(this.parent.timeFrom));
        }
      ),
    doctor: Yup.object().test(
      "doctor",
      "Doctor is required field",
      function (value) {
        if (!value || !value?.id) return false;
        return true;
      }
    ),

    date: Yup.date()
      .required(t("required", { field: t("appointment.date") }))
      .test("date", t("appointment.dateNotInPast"), function (value) {
        return !dayjs(value).startOf("day").isAfter(dayjs().startOf("day"));
      }),
  });

  //! Function
  const handleSubmit = async (values) => {
    setLoading(true);
    const toastId = toast.loading("Updating appointment...", {
      isLoading: true,
      autoClose: false,
    });

    try {
      const payload = appointmentModel.parseRequestAssignAppointment(values);
      await FirebaseServices.assignAppointment(id, payload);

      await refetchListAppointment();

      if (!isEmpty(device_tokens)) {
        FirebaseServices.sendNoti(
          device_tokens,
          "Appointment status changed",
          "Your appointment status has been changed to confirmed !"
        );
      }

      if (email) {
        FirebaseServices.sendEmailChangeStatus(
          email,
          name,
          values?.doctor?.name,
          "confirmed",
          `${dayjs(values?.timeFrom).format("HH:mm")}-${dayjs(
            values?.timeTo
          ).format("HH:mm")}`
        );
      }

      toast.update(toastId, {
        render: "Update appointment successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (error) {
      console.log("err", error);
      toast.update(toastId, {
        render: "Update appointment failed",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setLoading(false);
    }
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        width: 500,
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderBottom: "solid 1px #E8E8E8",
        }}
      >
        <CommonStyles.Typography
          type="bold20"
          sx={{
            color: "#000",
          }}
        >
          Details
        </CommonStyles.Typography>

        <CommonStyles.IconButton onClick={toggle}>
          <Close />
        </CommonStyles.IconButton>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "17px",
          padding: "16px 24px",
        }}
      >
        <Detail title={"Patient"} content={name} />
        <Detail title={"Phone number"} content={phone_number} />
        <Detail title={"Email"} content={email} />
        <Detail title={"Symptom(s)"} content={symptoms} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
        >
          {({ isSubmitting }) => {
            return (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <FastField
                  name="date"
                  component={CustomField.DatePicker}
                  fullWidth
                  label="Date"
                  disabled
                />
                <CommonStyles.Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <FastField
                    name="timeFrom"
                    component={CustomField.TimePicker}
                    fullWidth
                    label="Time from"
                  />
                  <FastField
                    name="timeTo"
                    component={CustomField.TimePicker}
                    fullWidth
                    label="Time to"
                  />
                </CommonStyles.Box>

                <SelectDoctor />

                <CommonStyles.Box
                  centered
                  sx={{ marginTop: "50px", justifyContent: "space-between" }}
                >
                  <CommonStyles.Button
                    variant="outlined"
                    disabled={isSubmitting}
                    color="error"
                    sx={{
                      padding: "15px 24px",
                      borderRadius: "8px",
                    }}
                  >
                    <CommonStyles.Typography
                      type="normal10"
                      sx={{
                        color: theme.palette.primary.error,
                      }}
                    >
                      Cancel
                    </CommonStyles.Typography>
                  </CommonStyles.Button>
                  <CommonStyles.Button
                    loading={isSubmitting}
                    type="submit"
                    sx={{
                      boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
                      padding: "15px 24px",
                      borderRadius: "8px",
                    }}
                  >
                    <CommonStyles.Typography
                      type="normal10"
                      sx={{
                        color: "#fff",
                      }}
                    >
                      Save
                    </CommonStyles.Typography>
                  </CommonStyles.Button>
                </CommonStyles.Box>
              </Form>
            );
          }}
        </Formik>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default AssignDialogContent;
