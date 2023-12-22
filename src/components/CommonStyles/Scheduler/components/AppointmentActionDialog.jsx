import React, { Fragment, useCallback, useMemo, useState } from "react";
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

const NewAppointmentDialogContent = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
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
            fullWidth
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
            fullWidth
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
    </CommonStyles.Box>
  );
};

const NewAppointmentDialogActions = (props) => {
  //! State
  const { handleSubmit, handleClose, isSubmitting } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        gap: "8px",
      }}
    >
      <CommonStyles.Button variant="text" disabled={isSubmitting}>
        <CommonStyles.Typography type="normal14" onClick={handleClose}>
          Cancel
        </CommonStyles.Typography>
      </CommonStyles.Button>
      <CommonStyles.Button onClick={handleSubmit} loading={isSubmitting}>
        <CommonStyles.Typography type="normal14" color="background">
          Save
        </CommonStyles.Typography>
      </CommonStyles.Button>
    </CommonStyles.Box>
  );
};

const NewAppointmentDialog = ({ data }) => {
  //! State
  const [open, setOpen] = useState(false);
  const save = useSave();
  const appointments = useGet(cachedKeys.APPOINTMENTS) || [];
  const initialValue = useMemo(() => {
    if (data) {
      return {
        id: data.id,
        patientName: data.patientName,
        pst: data.pst,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
        type: data.type,
      };
    }

    return {
      patientName: "",
      pst: [],
      startDate: dayjs(),
      endDate: dayjs().add(1, "hour"),
      type: "none",
    };
  }, [data]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      patientName: Yup.string().required("Required"),
      pst: Yup.array().required("Required"),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date()
        .required("Required")
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
    setOpen(false);
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
    setOpen(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (data) {
      return handleEdit(values, { setSubmitting });
    }

    return handleCreate(values, { setSubmitting });
  };

  //! Render
  const renderButton = useCallback(() => {
    if (data) {
      return (
        <CommonStyles.IconButton onClick={() => setOpen(true)}>
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
        onClick={() => setOpen(true)}
      >
        <CommonIcons.Add />
        <CommonStyles.Typography type="normal14" color="background">
          New Appointment
        </CommonStyles.Typography>
      </CommonStyles.Button>
    );
  }, [data]);

  return (
    <Fragment>
      {renderButton()}
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <Form>
              <CommonStyles.Dialog
                open={open}
                handleClose={() => setOpen(false)}
                fullWidth
                maxWidth="lg"
                title={
                  <CommonStyles.Typography type="bold18">
                    New Appointment
                  </CommonStyles.Typography>
                }
                content={<NewAppointmentDialogContent />}
                Actions={(props) => (
                  <NewAppointmentDialogActions
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    {...props}
                  />
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default NewAppointmentDialog;
