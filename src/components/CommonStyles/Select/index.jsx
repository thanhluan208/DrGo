import React, { memo, useState } from "react";
import MUISelect from "@mui/material/Select";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CommonStyles from "..";
import CommonIcons from "../../CommonIcons";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const Select = ({
  options = [],
  renderValue,
  value,
  sxContent,
  loading,
  label,
  fullWidth,
  defaultValue,
  ...otherProps
}) => {
  //! State
  const [isOpen, setIsOpen] = useState(false);
  const uuid = Math.random().toString(36).substring(7);

  //! Function

  console.log("open", isOpen);
  //! Render
  return (
    <FormControl fullWidth={fullWidth}>
      {label && <InputLabel id={uuid}>{label}</InputLabel>}

      <MUISelect
        labelId={uuid}
        id={uuid}
        label={label}
        onClose={() => setIsOpen(false)}
        onOpen={() => {
          setIsOpen(true);
        }}
        displayEmpty
        value={value}
        IconComponent={() => {
          if (loading) {
            return <CircularProgress size={20} />;
          }
          if (isOpen) {
            return <ArrowDropUp />;
          }
          return <ArrowDropDown />;
        }}
        {...otherProps}
      >
        {defaultValue && (
          <MenuItem value="" disabled>
            <CommonStyles.Typography type="normal14" color="primaryText">
              {defaultValue}
            </CommonStyles.Typography>
          </MenuItem>
        )}
        {options.map((option) => {
          const { value, label } = option;
          return (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          );
        })}
      </MUISelect>
    </FormControl>
  );
};

export default memo(Select);
