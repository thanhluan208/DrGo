import React, { useCallback } from "react";
import CommonStyles from "../../../components/CommonStyles";
import DatePicker from "./DatePicker";
import CommonIcons from "../../../components/CommonIcons";
import { useTheme } from "@emotion/react";
import cachedKeys from "../../../constants/cachedKeys";
import dayjs from "dayjs";
import { useGet, useSave } from "../../../stores/useStores";

const DatePickerGroup = ({ currentDate, setFilters }) => {
  //! State
  const theme = useTheme();

  //! Function

  const handleChangeDate = useCallback(
    (value) => {
      if (value === "next") {
        return setFilters((prev) => {
          return { ...prev, currentDate: prev?.currentDate.add(1, "day") };
        });
      }
      if (value === "prev") {
        return setFilters((prev) => {
          return { ...prev, currentDate: prev?.currentDate.subtract(1, "day") };
        });
      }
      return setFilters((prev) => {
        return { ...prev, currentDate: value };
      });
    },
    [setFilters]
  );

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
        onClick={() => handleChangeDate("prev")}
      >
        <CommonIcons.SingleArrowLeft />
      </CommonStyles.IconButton>
      <DatePicker currentDate={currentDate} handleChange={handleChangeDate} />

      <CommonStyles.IconButton
        customSx={{
          border: `1px solid ${theme.colors.custom.borderColor}`,
        }}
        onClick={() => handleChangeDate("next")}
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
