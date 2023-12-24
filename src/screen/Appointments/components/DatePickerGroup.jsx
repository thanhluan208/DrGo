import React, { useCallback } from "react";
import CommonStyles from "../../../components/CommonStyles";
import DatePicker from "./DatePicker";
import CommonIcons from "../../../components/CommonIcons";
import { useTheme } from "@emotion/react";
import cachedKeys from "../../../constants/cachedKeys";
import dayjs from "dayjs";
import { useGet, useSave } from "../../../stores/useStores";

const DatePickerGroup = () => {
  //! State
  const theme = useTheme();
  const currentDate = useGet(cachedKeys.CURRENT_DATE_APPOINTMENT) || dayjs();
  const save = useSave();

  //! Function
  const handlePrev = useCallback(() => {
    const newDate = currentDate.subtract(1, "day");
    save(cachedKeys.CURRENT_DATE_APPOINTMENT, newDate);
  }, [save, currentDate]);

  const handleNext = useCallback(() => {
    const newDate = currentDate.add(1, "day");
    save(cachedKeys.CURRENT_DATE_APPOINTMENT, newDate);
  }, [save, currentDate]);

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
        onClick={handlePrev}
      >
        <CommonIcons.SingleArrowLeft />
      </CommonStyles.IconButton>
      <DatePicker />

      <CommonStyles.IconButton
        customSx={{
          border: `1px solid ${theme.colors.custom.borderColor}`,
        }}
        onClick={handleNext}
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
