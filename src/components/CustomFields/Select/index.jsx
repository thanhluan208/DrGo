import React, { memo, useCallback, useEffect, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getIn } from "formik";
import Select from "@mui/material/Select";
import { find, isArray } from "lodash";
import { Box, CircularProgress, useTheme } from "@mui/material";
import CommonStyles from "../../CommonStyles";
import { useGet } from "../../../stores/useStores";

const SelectField = (props) => {
  //! State
  const {
    field,
    form,
    options,
    optionsKey,
    convertOptionCallback,
    label,
    sxContainer,
    placeholder,
    sxSelect,
    text,
    isOptionEqualToValue,
    onChangeCustomize,
    loading,
    isMultiple = false,
    afterOnChange,
    renderOptions,
    ...otherProps
  } = props;
  const { name, value, onBlur, onChange } = field || {};
  const [isFocus, setIsFocus] = React.useState(false);

  const selectValue = useMemo(() => {
    if (isOptionEqualToValue) {
      return isOptionEqualToValue(options, value);
    }
    return value;
  }, [isOptionEqualToValue, value, options]);

  const optionGetByKey = useGet(optionsKey) || [];

  const selectOptions = useMemo(() => {
    if (optionsKey) {
      if (convertOptionCallback) return convertOptionCallback(optionGetByKey);
      return optionGetByKey;
    }

    return options;
  }, [optionsKey, optionGetByKey, options, convertOptionCallback]);

  const { errors, touched, setFieldValue } = form || {};
  const theme = useTheme();

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  //! Function
  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (onChangeCustomize) {
        onChangeCustomize(value);
        return;
      }

      setFieldValue(name, value);

      if (afterOnChange) {
        afterOnChange(e);
      }
    },
    [name, setFieldValue, onChangeCustomize]
  );

  //! Render
  return (
    <CommonStyles.Box
      centered
      className="select-field"
      sx={{
        minWidth: 120,
        height: "48px",
        width: otherProps?.fullWidth ? "100%" : "auto",
        fieldset: {
          borderRadius: "8px",
        },
        marginTop: "16px",
        ...sxContainer,
      }}
    >
      <FormControl
        fullWidth={otherProps.fullWidth}
        error={isTouched && Boolean(errorMessage)}
        size={otherProps.size}
      >
        {/* Only for Customize */}
        {text}
        <InputLabel id={`${name}`}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          value={selectValue}
          label={label}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            onBlur(e);
            setIsFocus(false);
          }}
          name={name}
          onChange={handleChange}
          sx={{ borderRadius: "0.5rem", ...sxSelect }}
          endAdornment={
            loading ? (
              <CommonStyles.Box
                sx={{
                  paddingRight: "1.25rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={20} />
              </CommonStyles.Box>
            ) : undefined
          }
          {...otherProps}
        >
          {selectOptions?.map((option) => {
            const { value, label } = option || {};
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>

        {isTouched && errorMessage && (
          <CommonStyles.Box
            sx={{
              fontWeight: 400,
              fontSize: "0.75rem",
              lineHeight: 1.66,
              textAlign: "left",
              margin: "0.25rem 0.875rem 0 0.875rem",
              color: theme.palette.primary.error,
            }}
          >
            {errorMessage}
          </CommonStyles.Box>
        )}
      </FormControl>
    </CommonStyles.Box>
  );
};

export default memo(SelectField);
