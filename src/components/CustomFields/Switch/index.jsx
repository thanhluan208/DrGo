import * as React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

function SwitchField(props) {
  const {
    field,
    form,
    label,
    afterOnChange,
    sxContainer,
    labelPlacement = "start",
    ...restProps
  } = props;
  const { name, value } = field;
  const { setFieldValue } = form;

  const handleChange = (event) => {
    setFieldValue(name, event.target.checked);
    afterOnChange && afterOnChange(event);
  };

  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      sx={{ ml: 0, ...sxContainer }}
      control={
        <Switch
          name={name}
          checked={value}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          {...restProps}
        />
      }
      label={label}
    />
  );
}

export default SwitchField;
