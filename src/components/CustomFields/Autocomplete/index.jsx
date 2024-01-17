import React, { memo, useCallback, useEffect } from "react";
import MUIAutoComplete from "@mui/material/Autocomplete";
import { CircularProgress, TextField } from "@mui/material";
import { getIn } from "formik";
import CommonStyles from "../../CommonStyles";
import { useGet } from "../../../stores/useStores";

const AutoComplete = ({
  field,
  form,
  optionsKey,
  textFieldProps,
  sxContainer,
  sxSelect,
  infiniteScrollCallback,
  ...otherProps
}) => {
  //! State
  const { name, value } = field || {};
  const { errors, touched, setFieldValue } = form || {};
  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);
  const options = useGet(optionsKey) || [];

  //! Function
  const handleChange = (event, newValue) => {
    setFieldValue(name, newValue);
  };

  //! Render
  const renderInput = useCallback(
    (params) => {
      return (
        <TextField
          {...params}
          error={isTouched && !!errorMessage}
          helperText={isTouched && errorMessage}
          label={otherProps?.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {otherProps?.loading && (
                  <CircularProgress color="inherit" size={20} />
                )}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          {...textFieldProps}
        />
      );
    },
    [
      otherProps?.label,
      otherProps?.loading,
      errorMessage,
      isTouched,
      textFieldProps,
    ]
  );

  return (
    <CommonStyles.Box
      centered
      className="select-field"
      sx={{
        padding: "10px 0",
        minWidth: 120,
        ...sxContainer,
        width: otherProps?.fullWidth ? "100%" : "auto",
        fieldset: {
          borderRadius: "8px",
        },
      }}
    >
      <MUIAutoComplete
        options={options}
        id={name}
        value={value}
        onChange={handleChange}
        getOptionLabel={(option) => option?.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{ borderRadius: "0.5rem", ...sxSelect }}
        renderInput={renderInput}
        auto
        ListboxProps={{
          sx: {
            maxHeight: "250px",
          },
          onScroll: (event) => {
            if (
              event.target.scrollHeight - event.target.scrollTop ===
              event.target.clientHeight
            ) {
              // lastElm.current.scrollIntoView();
              infiniteScrollCallback();
            }
          },
        }}
        {...otherProps}
      />
    </CommonStyles.Box>
  );
};

export default memo(AutoComplete);
