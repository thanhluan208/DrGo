import React from "react";
import CommonStyles from "../../../components/CommonStyles";
import DatePicker from "./DatePicker";
import CommonIcons from "../../../components/CommonIcons";
import { useTheme } from "@emotion/react";

const DatePickerGroup = () => {
  //! State
  const theme = useTheme();
  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        gap: "16px",
      }}
    >
      <CommonStyles.IconButton
        customSx={{
          border: `1px solid ${theme.colors.custom.borderColor}`,
        }}
      >
        <CommonIcons.SingleArrowLeft />
      </CommonStyles.IconButton>
      <DatePicker />

      <CommonStyles.IconButton
        customSx={{
          border: `1px solid ${theme.colors.custom.borderColor}`,
        }}
      >
        <CommonIcons.SingleArrowLeft
          style={{
            transform: "rotate(180deg)",
          }}
        />
      </CommonStyles.IconButton>

      <CommonStyles.Box></CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default DatePickerGroup;
