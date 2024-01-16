import React, { Fragment, memo, useCallback, useMemo } from "react";
import CommonStyles from "../..";
import CommonIcons from "../../../CommonIcons";
import dayjs from "dayjs";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomFields from "../../../CustomFields";
import {
  createdByOptions,
  schedulerTypes,
  statusOptions,
} from "../../../../constants/options";
import { useGet } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";
import appointmentModel from "../../../../models/appointmentsModel";
import useToggleDialog from "../../../../hooks/useToggleDialog";
import { useTranslation } from "react-i18next";
import FirebaseServices from "../../../../services/firebaseServices";
import { toast } from "react-toastify";
import Eyes from "../../../../assets/icons/Eyes";
import DuplicateButton from "./DuplicateButton";
import SelectPatient from "./SelectPatient";
import SelectInsurance from "./SelectInsurance";
import SelectDoctor from "./SelectDoctor";

const NewAppointmentDialogContent = React.memo(
  ({ data, toggle, readOnly, isDuplicate }) => {
    //! State
    const refetchListAppointment = useGet(
      cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
    );

    const { t } = useTranslation();

    const initialValue = useMemo(() => {
      if (data) {
        return {
          id: data?.id || Math.floor(Math.random() * 100),
          patient: data?.patient || undefined,
          doctor: data?.doctor || "",
          startDate: data?.startDate ? dayjs(data?.startDate) : dayjs(),
          endDate: data?.endDate
            ? dayjs(data?.endDate)
            : dayjs().add(1, "hour"),
          type: data.type || "checkedIn",
          insurance: data?.insurance || "",
          visitedBefore: !!data?.visitedBefore,
          symptoms: data?.symptoms || "",
          createdBy: data?.createdBy || 1,
          status: data?.status || 1,
        };
      }

      return {
        patient: undefined,
        doctor: "",
        startDate: dayjs().add(1, "minute"),
        endDate: dayjs().add(1, "hour"),
        type: "checkedIn",
        insurance: "",
        visitedBefore: false,
        symptoms: "",
        createdBy: 1,
        status: 1,
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
        // insurance: Yup.string().required(
        //   t("required", { field: t("insurance") })
        // ),
        // symptoms: Yup.string().required(
        //   t("required", { field: t("symptoms") })
        // ),
        doctor: Yup.string().required(t("required", { field: t("doctor") })),
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
      const toastId = toast.loading("Updating appointment...", {
        autoClose: false,
      });
      try {
        await FirebaseServices.updateAppointment(values.id, {
          ...values,

          doctor: [values.doctor],
        });

        await refetchListAppointment();

        toast.update(toastId, {
          render: "Update appointment successfully",
          isLoading: false,
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
        });
      } catch (error) {
        console.log("err", error);
        toast.update(toastId, {
          render: "Update appointment failed: " + error.message || "",
          isLoading: false,
          type: toast.TYPE.ERROR,
          autoClose: 1000,
        });
      }
      setSubmitting(false);
      toggle();
    };

    const handleCreate = async (values, { setSubmitting }) => {
      setSubmitting(true);
      const loadingText = isDuplicate ? "Duplicating" : "Creating";
      const statusText = isDuplicate ? "Duplicate" : "Create";

      const toastId = toast.loading(`${loadingText} appointment...`, {
        autoClose: false,
      });

      try {
        const bodyRequest =
          appointmentModel.parseRequestCreateAppointment(values);
        await FirebaseServices.createAppointment(bodyRequest);

        await refetchListAppointment();

        toast.update(toastId, {
          render: `${statusText} appointment successfully`,
          isLoading: false,
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
        });
      } catch (error) {
        console.log("error", error);
        toast.update(toastId, {
          render: `${statusText} appointment failed: ` + error.message || "",
          isLoading: false,
          type: toast.TYPE.ERROR,
          autoClose: 1000,
        });
      }
      setSubmitting(false);
      toggle();
    };

    const handleSubmit = (values, { setSubmitting }) => {
      if (data && data.id && !isDuplicate) {
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
        enableReinitialize
      >
        {({ isSubmitting, handleSubmit, values }) => {
          return (
            <Form>
              <CommonStyles.Box
                sx={{ padding: "0 20px", marginBottom: "20px" }}
              >
                <FastField
                  name="visitedBefore"
                  component={CustomFields.SwitchField}
                  label="Visited before"
                  disabled={readOnly}
                />
              </CommonStyles.Box>
              <CommonStyles.Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                }}
              >
                <SelectPatient readOnly={readOnly} />
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
                    disabled={readOnly}
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
                    disabled={readOnly}
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
                    disabled={readOnly}
                  />
                </CommonStyles.Box>
              </CommonStyles.Box>
              <CommonStyles.Box
                centered
                sx={{
                  padding: "0 20px",
                  marginTop: "20px",
                  gap: "12px",
                }}
              >
                <SelectDoctor readOnly={readOnly} />
                {/* <SelectInsurance readOnly={readOnly} /> */}
                <FastField
                  name="status"
                  label="Status"
                  component={CustomFields.SelectField}
                  options={statusOptions}
                  fullWidth
                  disabled={readOnly}
                />
                <FastField
                  name="createdBy"
                  label="Created by"
                  component={CustomFields.SelectField}
                  options={createdByOptions}
                  fullWidth
                  disabled={readOnly}
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  padding: "0 20px",
                  marginTop: "20px",
                }}
              >
                <FastField
                  name="symptoms"
                  label="Symptoms"
                  fullWidth
                  component={CustomFields.TextField}
                  multiline
                  rows={4}
                  disabled={readOnly}
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
                {!isDuplicate && <DuplicateButton data={values} />}
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
  }
);

const AppointmentActionDialog = ({
  data,
  customButton,
  readOnly,
  isDuplicate,
}) => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();
  const { t } = useTranslation();

  //! Render
  const renderButton = useCallback(() => {
    if (customButton) return customButton(toggle);

    if (readOnly)
      return (
        <CommonStyles.IconButton onClick={toggle}>
          <Eyes color="#000000" />
        </CommonStyles.IconButton>
      );

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
              {data && data.id && !isDuplicate
                ? t("edit_appointment")
                : t("new_appointment")}
            </CommonStyles.Typography>
          }
          content={
            <NewAppointmentDialogContent
              data={data}
              toggle={toggle}
              readOnly={readOnly}
              isDuplicate={isDuplicate}
            />
          }
        />
      )}
    </Fragment>
  );
};

export default memo(AppointmentActionDialog);
