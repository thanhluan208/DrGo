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
    textFieldProps,
    sxContainer,
    ...otherProps
  } = props;
  const { errors, touched, setFieldValue } = form || {};
  const { name, value, onBlur } = field || {};

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  //! Function
  const handleChange = (date, context) => {
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
        fieldset: {
          borderRadius: "8px",
        },
        label: {
          color: !isTouched ? "rgba(0, 0, 0, 0.38) !important" : "",
        },

        ...sxContainer,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDateTimePicker
          value={value}
          onChange={handleChange}
          closeOnSelect={false}
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
          format={formatCustom ? formatCustom : DEFAULT_FORMAT_DATE}
          view="hours"
          {...otherProps}
        />
      </LocalizationProvider>
    </CommonStyles.Box>
  );
};

export default DateTimePicker;
