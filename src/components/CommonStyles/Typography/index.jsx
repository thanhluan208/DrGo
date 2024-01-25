import { useTheme } from "@emotion/react";
import TypographyMui from "@mui/material/Typography";
import { useMemo } from "react";

const Typography = (props) => {
  //! State
  const { type = "normal", color, sx, ...restProps } = props;
  const theme = useTheme();
  const sxCustomize = useMemo(() => {
    const styles = new Map();

    //! Bold
    styles.set("bold40", {
      fontSize: "40px",
      fontWeight: "700",
      lineHeight: "46px",
      color: theme.colors.custom.boldText,
    });

    styles.set("bold24", {
      fontSize: "24px",
      fontWeight: "800",
      lineHeight: "36px",
      color: theme.colors.custom.boldText,
    });

    styles.set("bold20", {
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "26px",
      color: theme.colors.custom.boldText,
    });

    styles.set("bold14", {
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "20px",
      color: theme.colors.custom.boldText,
    });

    styles.set("bold12", {
      fontSize: "12px",
      fontWeight: "700",
      lineHeight: "20px",
      color: theme.colors.custom.boldText,
    });

    styles.set("bold10", {
      fontSize: "10px",
      fontWeight: "800",
      lineHeight: "16px",
      color: theme.colors.custom.boldText,
    });

    //! Normal
    styles.set("normal20", {
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "26px",
      color: theme.colors.custom.normalText,
    });

    styles.set("normal18", {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "24px",
    });

    styles.set("normal14", {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      color: theme.colors.custom.normalText,
    });

    return styles.get(type);
  }, [type, theme]);

  //! Render
  return (
    <TypographyMui
      sx={{
        color: theme.colors.custom[color || "primaryText"],
        fontFamily: "'Poppins', sans-serif",
        ...sxCustomize,
        ...sx,
      }}
      {...restProps}
    >
      {props.children}
    </TypographyMui>
  );
};

export default Typography;
