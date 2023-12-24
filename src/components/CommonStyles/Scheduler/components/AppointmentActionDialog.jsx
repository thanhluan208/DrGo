import React, { Fragment, memo, useCallback, useMemo } from "react";
import CommonStyles from "../..";
import CommonIcons from "../../../CommonIcons";
import dayjs from "dayjs";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomFields from "../../../CustomFields";
import { schedulerTypes } from "../../../../constants/options";
import { convertPstToOptions } from "../../../../helpers/common";
import { PST } from "../../../../assets/mockdata";
import { useGet, useSave } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";
import { useToastPromise } from "../../../../hooks/useToast";
import appointmentModel from "../../../../models/appointmentsModel";
import { cloneDeep } from "lodash";
import useToggleDialog from "../../../../hooks/useToggleDialog";
import { useTranslation } from "react-i18next";

const NewAppointmentDialogContent = React.memo(({ data, toggle }) => {
  //! State
  const appointments = useGet(cachedKeys.APPOINTMENTS) || [];
  const save = useSave();
  const { t } = useTranslation();

  const initialValue = useMemo(() => {
    if (data) {
      return {
        id: data?.id || Math.floor(Math.random() * 100),
        patientName: data?.patientName || "",
        pst: data?.pst || [],
        startDate: data?.startDate ? dayjs(data.startDate) : dayjs(),
        endDate: data?.endDate ? dayjs(data.endDate) : dayjs().add(1, "hour"),
        type: data.type || "checkedIn",
      };
    }

    return {
      patientName: "",
      pst: [],
      startDate: dayjs().add(1, "minute"),
      endDate: dayjs().add(1, "hour"),
      type: "checkedIn",
    };
  }, [data]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      patientName: Yup.string().required(
        t("required", { field: t("patient_name") })
      ),
      pst: Yup.array().test(
        "is-not-empty",
        t("required", { field: "PST" }),
        function (value) {
          return value.length > 0;
        }
      ),
      startDate: Yup.string()
        .test("is-date", "Start date must be a valid date", function (value) {
          return dayjs(value).isValid();
        })
        .test(
          "is-greater",
          "Start date must be greater than present time",
          function (value) {
            return dayjs(value).isAfter(dayjs());
          }
        ),
      endDate: Yup.string()
        .test("is-date", "End date must be a valid date", function (value) {
          return dayjs(value).isValid();
        })
        .test(
          "is-greater",
          "End date must be greater than start date",
          function (value) {
            return dayjs(value).isAfter(dayjs(this.parent.startDate));
          }
        ),
      type: Yup.string().required("Required"),
    });
  }, []);

  //! Function
  const handleEdit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const cloneAppointment = cloneDeep(appointments);
    try {
      const foundAppointmentIndex = cloneAppointment.findIndex(
        (item) => item.id === values.id
      );
      cloneAppointment[foundAppointmentIndex] =
        appointmentModel.parseCreateAppointment(values);

      console.log("cloneApp", cloneAppointment);
      const promise = () =>
        new Promise((res) => {
          setTimeout(() => {
            save(cachedKeys.APPOINTMENTS, cloneAppointment);
            res();
          }, 1500);
        });

      await useToastPromise(promise, {
        pending: "Editing...",
        success: "Edit successfully",
        error: "Edit failed",
      });
    } catch (error) {
      console.log("error", error);
    }
    setSubmitting(false);
    toggle();
  };

  const handleCreate = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const promise = () =>
        new Promise((resolve) => {
          const parsedValues = appointmentModel.parseCreateAppointment(values);
          setTimeout(() => {
            save(cachedKeys.APPOINTMENTS, [...appointments, parsedValues]);
            resolve();
          }, 1500);
        });

      await useToastPromise(promise, {
        pending: "Saving...",
        success: "Save successfully",
        error: "Save failed",
      });
    } catch (error) {
      console.log("error", error);
    }
    setSubmitting(false);
    toggle();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (data && data.id) {
      return handleEdit(values, { setSubmitting });
    }

    return handleCreate(values, { setSubmitting });
  };

  //! Render
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validateOnMount={false}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <Form>
            <CommonStyles.Box
              sx={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
              }}
            >
              <CommonStyles.Box
                sx={{
                  padding: "0 20px",
                }}
              >
                <FastField
                  name="patientName"
                  label="Patient name"
                  component={CustomFields.TextField}
                  fullWidth
                  placeholder="Patient name"
                  required
                />
              </CommonStyles.Box>
              <CommonStyles.Box
                sx={{
                  padding: "0 20px",
                }}
              >
                <FastField
                  name="type"
                  label="Scheduler type"
                  component={CustomFields.SelectField}
                  options={schedulerTypes}
                  fullWidth
                  placeholder="Scheduler type"
                />
              </CommonStyles.Box>
              <CommonStyles.Box
                sx={{
                  padding: "0 20px",
                }}
              >
                <FastField
                  name="startDate"
                  component={CustomFields.DateTimePicker}
                  label="Start date"
                  minDateTime={dayjs()}
                  fullWidth
                  textFieldProps={{
                    required: true,
                  }}
                />
              </CommonStyles.Box>
              <CommonStyles.Box
                sx={{
                  padding: "0 20px",
                }}
              >
                <FastField
                  name="endDate"
                  component={CustomFields.DateTimePicker}
                  label="End date"
                  minDateTime={dayjs()}
                  fullWidth
                  textFieldProps={{
                    required: true,
                  }}
                />
              </CommonStyles.Box>
            </CommonStyles.Box>
            <CommonStyles.Box sx={{ padding: "0 20px", marginTop: "20px" }}>
              <FastField
                name="pst"
                component={CustomFields.SelectField}
                options={convertPstToOptions(PST)}
                fullWidth
                isMultiple
                label="PST"
              />
            </CommonStyles.Box>
            <CommonStyles.Box
              centered
              sx={{
                gap: "8px",
                marginTop: "30px",
                justifyContent: "flex-end",
              }}
            >
              <CommonStyles.Button variant="text" disabled={isSubmitting}>
                <CommonStyles.Typography type="normal14" onClick={toggle}>
                  {t("cancel")}
                </CommonStyles.Typography>
              </CommonStyles.Button>
              <CommonStyles.Button
                onClick={handleSubmit}
                loading={isSubmitting}
              >
                <CommonStyles.Typography type="normal14" color="background">
                  {t("save")}
                </CommonStyles.Typography>
              </CommonStyles.Button>
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
});

const AppointmentActionDialog = ({ data, customButton }) => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();
  const { t } = useTranslation();

  //! Render
  const renderButton = useCallback(() => {
    if (customButton) return customButton(toggle);

    if (data) {
      return (
        <CommonStyles.IconButton onClick={toggle}>
          <CommonIcons.Edit />
        </CommonStyles.IconButton>
      );
    }

    return (
      <CommonStyles.Button
        sx={{
          gap: "4px",
          textTransform: "none",
          boxShadow: "none",
        }}
        onClick={toggle}
      >
        <CommonIcons.Add />
        <CommonStyles.Typography type="normal14" color="background">
          {t("new_appointment")}
        </CommonStyles.Typography>
      </CommonStyles.Button>
    );
  }, [data, customButton]);

  return (
    <Fragment>
      {renderButton()}
      {shouldRender && (
        <CommonStyles.Dialog
          open={open}
          handleClose={toggle}
          fullWidth
          maxWidth="lg"
          title={
            <CommonStyles.Typography type="bold18">
              {data && data.id ? t("edit_appointment") : t("new_appointment")}
            </CommonStyles.Typography>
          }
          content={<NewAppointmentDialogContent data={data} toggle={toggle} />}
        />
      )}
    </Fragment>
  );
};

export default memo(AppointmentActionDialog);
