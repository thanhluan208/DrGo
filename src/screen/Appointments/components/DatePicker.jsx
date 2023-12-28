import * as React from "react";

import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonStyles from "../../../components/CommonStyles";
import dayjs from "dayjs";
import { useGet, useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import CommonIcons from "../../../components/CommonIcons";

const appointmentDateOptions = [
  {
    value: 0,
    label: "Today",
  },
  {
    value: 1,
    label: "Tomorrow",
  },
  {
    value: 7,
    label: "Next week",
  },
  {
    value: 30,
    label: "Next month",
  },
];

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

  const save = useSave();

  //! Function
  const handleChangeCurrenDate = (day) => {
    if (day === 30) {
      save(cachedKeys.CURRENT_DATE_APPOINTMENT, dayjs().add(1, "month"));
      return;
    }
    save(cachedKeys.CURRENT_DATE_APPOINTMENT, dayjs().add(day, "day"));
  };

  //! Render
  return (
    <CommonStyles.Box centered>
      <Button
        variant="text"
        id={id}
        disabled={disabled}
        ref={ref}
        aria-label={ariaLabel}
        sx={{ textTransform: "none" }}
        onClick={() => setOpen?.((prev) => !prev)}
      >
        <CommonStyles.Typography type="bold14" color="primaryText">
          {value ? dayjs(value).format("MMM DD, YYYY") : "Select a date"}
        </CommonStyles.Typography>
      </Button>
      <CommonStyles.Select
        onChange={(event) => {
          handleChangeCurrenDate(event.target.value);
        }}
        renderValue={(label) => {
          return (
            <CommonStyles.Typography type="normal14" color="secondaryText">
              {label}
            </CommonStyles.Typography>
          );
        }}
        defaultValue={0}
        options={appointmentDateOptions}
        sx={{
          width: "auto",
          fieldset: {
            border: "none",
          },
        }}
      />
    </CommonStyles.Box>
  );
};

const ButtonDatePicker = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
};

const PickerWithButtonField = ({ currentDate, handleChange }) => {
  //! State

  //! Function

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        value={currentDate || dayjs()}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default React.memo(PickerWithButtonField);
