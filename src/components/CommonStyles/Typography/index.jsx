import { useTheme } from "@emotion/react";
import TypographyMui from "@mui/material/Typography";
import { useMemo } from "react";

const Typography = (props) => {
  //! State
  const { type = "normal", color, sx, ...restProps } = props;
  const theme = useTheme();
  const sxCustomize = useMemo(() => {
    const styles = new Map();

    styles.set("bold14", {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "20px",
    });

    styles.set("bold18", {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "24px",
    });

    styles.set("bold24", {
      fontSize: "24px",
      fontWeight: "600",
      lineHeight: "32px",
    });

    styles.set("normal14", {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
    });

    styles.set("normal12", {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "16px",
    });

    styles.set("normal10", {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "12px",
    });

    return styles.get(type);
  }, [type]);

  //! Render
  return (
    <TypographyMui
      sx={{
        color: theme.colors.custom[color || "primaryText"],
        fontFamily: "'Noto Sans', sans-serif",
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
