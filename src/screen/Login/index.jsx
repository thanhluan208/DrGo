import { FastField, Form, Formik } from "formik";
import React, { useMemo } from "react";
import CustomFields from "../../components/CustomFields";
import CommonStyles from "../../components/CommonStyles";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import * as Yup from "yup";
import FirebaseServices from "../../services/firebaseServices";

const Login = () => {
  //! State
  const { handleLogin } = useAuthentication();
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
              <FastField
                name="email"
                label="Email"
                component={CustomFields.TextField}
              />
              <FastField
                name="password"
                label="Password"
                type="password"
                component={CustomFields.TextField}
              />
              <CommonStyles.Button type="submit" loading={isSubmitting}>
                login
              </CommonStyles.Button>

              <CommonStyles.Typography>
                email: thanhluan20880@gmail.com
              </CommonStyles.Typography>
              <CommonStyles.Typography>
                password: Hihihi1234
              </CommonStyles.Typography>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default Login;
