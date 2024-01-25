import React, { useRef } from "react";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import MuiTextField from "@mui/material/TextField";
import { getIn } from "formik";
import { useMemo } from "react";
import useToggle from "../../../hooks/useToggle";
import CommonStyles from "../../CommonStyles";

const TextField = ({
  field,
  form,
  variant,
  size,
  iconStartInput,
  sx,
  iconEndInput,
  onChangeCustomize,
  afterOnChange,
  onClickEndAdornment,
  sxEndAdornment,
  type = "text",
  isFormatNumber,
  disabled = false,
  ...props
}) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};
  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);
  const { show: showPassword, toggle: togglePassword } = useToggle();

  const typePassword = useMemo(() => {
    return showPassword ? "text" : "password";
  }, [showPassword]);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

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
        label: {
          transform: `translate(14px, ${
            isFocus || !!`${value}` ? "-9px" : "12.5px"
          }) scale(${isFocus || !!`${value}` ? "0.75" : "1"}) `,
        },
      }}
    >
      <MuiTextField
        type={type === "password" ? typePassword : type}
        name={name}
        value={value}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={(e) => {
          onBlur(e);
          setIsFocus(false);
        }}
        onChange={(e) => {
          if (onChangeCustomize) {
            onChangeCustomize(e.target.value);
            return;
          }

          onChange && onChange(e);
          afterOnChange && afterOnChange(e.target.value);
        }}
        error={isTouched && Boolean(errorMessage)}
        helperText={isTouched && errorMessage}
        variant={variant}
        size={size}
        InputProps={{
          inputComponent: isFormatNumber ? NumericFormatCustom : undefined,
          startAdornment: iconStartInput ? (
            <InputAdornment position="start" className="icon-start-input">
              {iconStartInput}
            </InputAdornment>
          ) : undefined,
          endAdornment: iconEndInput ? (
            <InputAdornment
              position="end"
              sx={sxEndAdornment || {}}
              onClick={onClickEndAdornment || undefined}
            >
              {iconEndInput}
            </InputAdornment>
          ) : type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePassword}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        {...props}
      />
    </CommonStyles.Box>
  );
};

export default TextField;
