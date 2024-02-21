import React, { useMemo } from "react";
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
import { locationOptions } from "../../../constants/options";

const DialogEditAndCreate = ({ data, toggle }) => {
  //! State
  const theme = useTheme();
  const { t } = useTranslation();
  const isEdit = useMemo(() => !!data, [data]);
  const refetchListDoctor = useGet(cachedKeys.DOCTOR.REFETCH_LIST_DOCTOR);
  const initialValue = useMemo(() => {
    return {
      name: data?.name || "",
      description: data?.description || "",
      about: data?.about || "",
      location: data?.location || "",
      email: data?.email || "",
    };
  }, [data]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("required", { field: t("doctor.name") })),
      email: Yup.string().required(t("required", { field: t("doctor.email") })),
      location: Yup.string().required(
        t("required", { field: t("doctor.location") })
      ),
      description: Yup.string().required(
        t("required", { field: t("doctor.description") })
      ),
      about: Yup.string().required(t("required", { field: t("doctor.about") })),
    });
  }, [t]);

  //! Function
  const handleSubmit = async (values) => {
    const toastId = toast.loading(
      isEdit ? t("doctor.updating") : t("doctor.creating"),
      {
        isLoading: true,
        autoClose: false,
      }
    );

    try {
      if (isEdit) {
        await FirebaseServices.updateDoctor(data.id, values);
      } else {
        await FirebaseServices.createDoctor(values);
      }

      await refetchListDoctor();

      toast.update(toastId, {
        isLoading: false,
        render: isEdit
          ? t("doctor.updateDoctorSuccessfully")
          : t("doctor.createDoctorSuccessfully"),
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });

      toggle();
    } catch (error) {
      console.log("error", error);
      toast.update(toastId, {
        isLoading: false,
        render: t("doctor.actionDoctorFailed"),
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
            {isEdit ? t("editDoctor") : t("doctor.addNewDoctor")}
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
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
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
                  placeholder="Enter doctor name"
                  fullWidth
                />
                <FastField
                  name="email"
                  component={CustomFields.TextField}
                  label="Email"
                  fullWidth
                  placeholder="Enter doctor email"
                />
                <FastField
                  name="location"
                  component={CustomFields.SelectField}
                  label="Location"
                  fullWidth
                  placeholder="Enter doctor location"
                  options={locationOptions}
                  sxContainer={{
                    marginTop: 0,
                    "& .MuiSelect-select": {
                      minHeight: "15px !important",
                      height: "15px !important",
                    },
                    fieldset: {
                      height: "53px",
                    },
                  }}
                />
              </CommonStyles.Box>

              <FastField
                name="description"
                component={CustomFields.TextField}
                label="Description"
                fullWidth
                placeholder="Enter doctor description"
                multiline
                minRows={2}
                maxRows={4}
              />

              <FastField
                name="about"
                component={CustomFields.TextField}
                label="About"
                fullWidth
                placeholder="Enter doctor about"
                multiline
                minRows={2}
                maxRows={4}
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
                    {isEdit ? t("doctor.save") : t("doctor.create")}
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
