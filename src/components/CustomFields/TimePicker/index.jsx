import React, { useCallback } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MUITimePicker } from "@mui/x-date-pickers/TimePicker";
import { getIn } from "formik";
import CommonStyles from "../../CommonStyles";
import dayjs from "dayjs";

const TimePicker = ({
  form,
  field,
  label,
  fullWidth,
  textFieldProps,
  onChangeCustomize,
  afterOnChange,
}) => {
  //! State
  const { errors, touched, setFieldValue } = form || {};
  const { name, value, onBlur } = field || {};

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  //! Function
  const handleChange = useCallback((newValue) => {
    if (onChangeCustomize) {
      onChangeCustomize(newValue);
      return;
    }

    const newDate = newValue?.toDate();

    setFieldValue(name, newDate);

    afterOnChange && afterOnChange(newDate);
  }, []);

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        width: "100%",
        fieldset: {
          borderRadius: "8px",
        },
        input: {
          padding: "12.5px 14px",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUITimePicker
          value={dayjs(value)}
          onChange={handleChange}
          label={label}
          slotProps={{
            textField: {
              fullWidth: fullWidth,
              onBlur,
              name,
              id: name,
              error: isTouched && Boolean(errorMessage),
              helperText: isTouched && errorMessage,
              ...textFieldProps,
            },
            actionBar: value
              ? {
                  actions: ["clear"],
                }
              : undefined,
          }}
        />
      </LocalizationProvider>
    </CommonStyles.Box>
  );
};

export default TimePicker;
