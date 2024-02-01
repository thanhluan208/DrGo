import * as React from "react";

import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CommonStyles from "../../../components/CommonStyles";
import { useTheme } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

import "./time.css";

const ButtonField = (props) => {
  //! State
  const {
    setOpen,
    value,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box centered>
      <Button
        variant={value ? "contained" : "outlined"}
        id={id}
        disabled={disabled}
        ref={ref}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
        sx={{
          width: "100%",
          borderRadius: "50px",
          padding: "15px 25px 15px 20px",
          textTransform: "none",
          ul: {
            display: "none !important",
          },
        }}
      >
        <CommonStyles.Typography
          type="normal20"
          sx={{
            color: value ? "#fff" : theme.palette.primary.main,
          }}
        >
          {value ? dayjs(value).format("mm") + " minutes" : "Custom"}
        </CommonStyles.Typography>
      </Button>
    </CommonStyles.Box>
  );
};

const ButtonDatePicker = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TimePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      view="minutes"
      closeOnSelect={false}
    />
  );
};

const PickerWithButtonField = ({ value, handleChange }) => {
  //! State

  //! Function

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker value={value} onChange={handleChange} />
    </LocalizationProvider>
  );
};

export default React.memo(PickerWithButtonField);
