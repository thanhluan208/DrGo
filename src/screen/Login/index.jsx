import { FastField, Form, Formik } from "formik";
import React, { useMemo } from "react";
import CustomFields from "../../components/CustomFields";
import CommonStyles from "../../components/CommonStyles";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import * as Yup from "yup";
import FirebaseServices from "../../services/firebaseServices";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

const Login = () => {
  //! State
  const { t } = useTranslation();
  const theme = useTheme();
  const { handleLogin, handleSignUp, signingUp } = useAuthentication();
  const initialValue = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  });
  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box
                centered
                sx={{
                  width: "100vw",
                  height: "100vh",
                  flexDirection: "column",
                  background: "#d9e3f1",
                }}
              >
                <CommonStyles.Box
                  centered
                  sx={{
                    flexDirection: "column",
                    padding: "120px 100px",
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: "16px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <CommonStyles.Typography type="bold40">
                    {t("layout.dashboard")}
                  </CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{
                      marginTop: "40px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <FastField
                      name="email"
                      label="Email"
                      component={CustomFields.TextField}
                      fullWidth
                    />
                    <FastField
                      name="password"
                      label="Password"
                      type="password"
                      component={CustomFields.TextField}
                      fullWidth
                    />
                  </CommonStyles.Box>
                  <CommonStyles.Box
                    sx={{
                      marginTop: "24px",
                      width: "272px",
                    }}
                  >
                    <CommonStyles.Button
                      type="submit"
                      loading={isSubmitting}
                      disabled={signingUp}
                      fullWidth
                      variant="outlined"
                      sx={{
                        padding: "12px 0",
                      }}
                    >
                      <CommonStyles.Typography
                        type="bold16"
                        sx={{
                          color: "#000",
                        }}
                      >
                        Login
                      </CommonStyles.Typography>
                    </CommonStyles.Button>
                  </CommonStyles.Box>

                  <CommonStyles.Box
                    sx={{
                      marginTop: "20px",
                    }}
                  >
                    <CommonStyles.Typography>
                      Email: thanhluan20880@gmail.com
                    </CommonStyles.Typography>
                    <CommonStyles.Typography>
                      Password: Hihihi1234
                    </CommonStyles.Typography>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default Login;
