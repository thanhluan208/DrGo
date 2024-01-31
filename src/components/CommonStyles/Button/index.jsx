import MuiIconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMemo } from "react";

export const ButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACTIVE: "active",
  UNACTIVE: "unactive",
};

const Button = (props) => {
  const { buttonType, sx, ...otherProps } = props;

  const styleForType = useMemo(() => {
    let styles = {
      height: "55px",
      padding: "15px 20px",
      boxShadow: "none",
      borderRadius: "50px",
      gap: "5px",
      "&:hover": {
        boxShadow: "none",
      },
    };

    if (buttonType === ButtonType.PRIMARY) {
      styles.boxShadow = "0px 6px 12px 0px rgba(51, 108, 251, 0.16)";
      return styles;
    }

    if (buttonType === ButtonType.SECONDARY) {
      styles.background = "#fff";
      styles["&:hover"] = {
        ...styles["&:hover"],
        background: "#e5e5e5",
      };
      return styles;
    }

    if (buttonType === ButtonType.ACTIVE) {
      styles.background = "#00E009";
      styles.padding = "10px 25px";
      styles.height = "40px";
      styles["&:hover"] = {
        ...styles["&:hover"],
        background: "#04b30b",
      };
      return styles;
    }

    if (buttonType === ButtonType.UNACTIVE) {
      styles.background = "#C8C8C8";
      styles.padding = "10px 25px";
      styles.height = "40px";
      styles["&:hover"] = {
        ...styles["&:hover"],
        background: "#a5a5a5",
      };
      return styles;
    }

    return {};
  }, [buttonType]);

  return (
    <LoadingButton
      variant="contained"
      sx={{
        textTransform: "none",
        ...styleForType,
        ...sx,
      }}
      {...otherProps}
    >
      {props.children}
    </LoadingButton>
  );
};

export default Button;
