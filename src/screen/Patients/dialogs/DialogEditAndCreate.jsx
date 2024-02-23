import React, { useMemo, useRef } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Close from "../../../assets/icons/Close";
import { FastField, Form, Formik } from "formik";
import CustomFields from "../../../components/CustomFields";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";

const DialogEditAndCreate = ({ data, toggle }) => {
  //! State
  const theme = useTheme();
  const formikRef = useRef(null);
  const { t } = useTranslation();
  const isEdit = useMemo(() => !!data, [data]);
  const refetchListPatient = useGet(cachedKeys.PATIENT.REFETCH_LIST_PATIENT);
  const initialValue = useMemo(() => {
    return {
      name: data?.name || "",
      email: data?.email || "",
      phone_number: data?.phone_number || "",
      is_employee: !!data?.is_employee,
      is_active: !!data?.is_active,
    };
  }, [data]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("required", { field: "Name" })),
      email: Yup.string().required(t("required", { field: "Email" })),
      phone_number: Yup.string().required(
        t("required", { field: "Phone Number" })
      ),
    });
  }, [t]);

  //! Function
  const handleSubmit = async (values) => {
    const toastId = toast.loading(
      isEdit ? "Editing patient infos..." : "Creating new patient...",
      {
        isLoading: true,
        autoClose: false,
      }
    );

    try {
      if (isEdit) {
        await FirebaseServices.updatePatient(data.id, values);
      } else {
        await FirebaseServices.createPatient(values);
      }

      await refetchListPatient();

      toast.update(toastId, {
        isLoading: false,
        render: isEdit
          ? "Edit patient infos successfully"
          : "Create new patient successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });

      toggle();
    } catch (error) {
      console.log("error", error);
      toast.update(toastId, {
        isLoading: false,
        render: "Error when editing patient infos",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
      });
    }
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "12px 24px 39px 24px",
        width: "100%",
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
            {isEdit ? "Edit patient infos" : "Create new patient"}
          </CommonStyles.Typography>
        </CommonStyles.Box>

        <CommonStyles.IconButton
          onClick={toggle}
          disabled={formikRef?.current?.isSubmitting}
        >
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
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        innerRef={formikRef}
      >
        {({ isSubmitting }) => {
          return (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <CommonStyles.Box
                sx={{
                  gap: "32px",
                  justifyContent: "start",
                }}
                centered
              >
                <FastField
                  name="is_employee"
                  component={CustomFields.SwitchField}
                  label="Is employee"
                />

                <FastField
                  name="is_active"
                  component={CustomFields.SwitchField}
                  label="Active"
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
                centered
              >
                <FastField
                  name="name"
                  component={CustomFields.TextField}
                  label="Name"
                  placeholder="Enter patient name"
                  fullWidth
                />
                <FastField
                  name="email"
                  component={CustomFields.TextField}
                  label="Email"
                  fullWidth
                  placeholder="Enter patient email"
                />
              </CommonStyles.Box>

              <FastField
                name="phone_number"
                component={CustomFields.TextField}
                label="Phone number"
                fullWidth
                placeholder="Enter patient phone number"
                type="number"
              />

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
                    {isEdit ? "Save" : "Create"}
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

export default DialogEditAndCreate;
