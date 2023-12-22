import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CommonStyles from "../../CommonStyles";
import { getIn } from "formik";

const DEFAULT_FORMAT_DATE = "DD/MM/YYYY HH:mm";

const DateTimePicker = (props) => {
  //! State
  const {
    field,
    form,
    fullWidth,
    icon,
    formatCustom,
    afterOnChange,
    onChangeCustomize,
    ...otherProps
  } = props;
  const { errors, touched, setFieldValue } = form || {};
  const { name, value, onBlur } = field || {};

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  //! Function
  const handleChange = (date, context) => {
    console.log("data", date, context);
    if (onChangeCustomize) {
      onChangeCustomize(date);
      return;
    }

    setFieldValue(name, date);

    afterOnChange && afterOnChange(date);
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "10px 0",
        fieldset: {
          borderRadius: "8px",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDateTimePicker
          value={value}
          onChange={handleChange}
          slotProps={{
            textField: {
              fullWidth: fullWidth,
              onBlur,
              name,
              id: name,
              error: isTouched && Boolean(errorMessage),
              helperText: isTouched && errorMessage,
            },
            actionBar: value
              ? {
                  actions: ["clear"],
                }
              : undefined,
          }}
          //   slots={{
          //     openPickerIcon: icon ? icon : undefined,
          //   }}
          //   onAccept={(newDate) => {
          //     if (isNull(newDate)) {
          //       setFieldValue(name, undefined);
          //     }
          //   }}
          format={formatCustom ? formatCustom : DEFAULT_FORMAT_DATE}
          {...otherProps}
        />
      </LocalizationProvider>
    </CommonStyles.Box>
  );
};

export default DateTimePicker;
