import React, { useCallback } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonStyles from "../../CommonStyles";
import { getIn } from "formik";
import dayjs from "dayjs";

const DatePicker = ({
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
  const handleChange = useCallback(
    (newValue) => {
      if (onChangeCustomize) {
        onChangeCustomize(newValue);
        return;
      }

      const newDate = newValue?.toDate();

      setFieldValue(name, newDate);

      afterOnChange && afterOnChange(newDate);
    },
    [setFieldValue]
  );

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
        <MUIDatePicker
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

export default DatePicker;
