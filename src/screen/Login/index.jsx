import { FastField, Form, Formik } from "formik";
import React, { useMemo } from "react";
import CustomFields from "../../components/CustomFields";
import CommonStyles from "../../components/CommonStyles";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import * as Yup from "yup";

const Login = () => {
  //! State
  const { handleLoginTest } = useAuthentication();
  const initialValue = useMemo(() => {
    return {
      username: "",
      password: "",
    };
  }, []);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });
  });
  //! Function
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("handleSubmit", values);
    handleLoginTest(values, setSubmitting);
  };

  //! Render
  return (
    <CommonStyles.Box>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FastField
                name="username"
                label="User name"
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
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default Login;
