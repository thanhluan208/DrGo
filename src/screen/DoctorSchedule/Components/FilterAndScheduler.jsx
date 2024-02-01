import React, { useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Previous from "../../../assets/icons/Previous";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useFilter from "../../../hooks/useFilter";
import useGetSchedules from "../../../hooks/schedule/useGetSchedules";
import { cloneDeep } from "lodash";

const FilterAndScheduler = ({ doctor }) => {
  //! State
  const { filters, setFilters } = useFilter({
    doctor,
    startDate: dayjs().startOf("week"),
    endDate: dayjs().endOf("week"),
  });

  const { data, isLoading } = useGetSchedules(filters);

  //! Function
  const handleChangeDate = (type, value) => {
    setFilters((prev) => {
      if (type === "year") {
        const isSameYear = prev.startDate.isSame(value, "year");
        if (isSameYear) return;

        const startDateIsSameYear = cloneDeep(value)
          .startOf("year")
          .startOf("week")
          .isSame(cloneDeep(value).startOf("year"), "year");

        return {
          ...prev,
          startDate: startDateIsSameYear
            ? cloneDeep(value).startOf("year").startOf("week")
            : cloneDeep(value).startOf("year").startOf("week").add(1, "week"),
          endDate: startDateIsSameYear
            ? cloneDeep(value).startOf("year").startOf("week").add(1, "week")
            : cloneDeep(value).startOf("year").startOf("week").add(2, "week"),
        };
      }

      const isSameMonth = prev.startDate.isSame(value, "month");
      if (isSameMonth) {
        return;
      }

      const startDateIsSameMonth = cloneDeep(value)
        .startOf("month")
        .startOf("week")
        .isSame(cloneDeep(value).startOf("month"), "month");

      return {
        ...prev,
        startDate: startDateIsSameMonth
          ? cloneDeep(value).startOf("month").startOf("week")
          : cloneDeep(value).startOf("month").startOf("week").add(1, "week"),
        endDate: startDateIsSameMonth
          ? cloneDeep(value).startOf("month").startOf("week").add(1, "week")
          : cloneDeep(value).startOf("month").startOf("week").add(2, "week"),
      };
    });
  };

  const handleChangeWeek = (type) => {
    if (type === "previous") {
      setFilters((prev) => {
        return {
          ...prev,
          startDate: prev.startDate.subtract(1, "week"),
          endDate: prev.endDate.subtract(1, "week"),
        };
      });
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          startDate: prev.startDate.add(1, "week"),
          endDate: prev.endDate.add(1, "week"),
        };
      });
    }
  };

  //! Render
  const renderDate = () => {
    const { startDate, endDate } = filters;
    const isSameMonth = startDate.isSame(endDate, "month");
    const isSameYear = startDate.isSame(endDate, "year");

    if (isSameMonth && isSameYear) {
      return `${startDate.format("MMMM")}, ${startDate.format(
        "DD"
      )}-${endDate.format("DD")}`;
    }

    if (isSameYear) {
      return `${startDate.format("MMMM DD")} - ${endDate.format("MMMM DD")}`;
    }

    return `${startDate.format("MMMM DD, YYYY")} - ${endDate.format(
      "MMMM DD, YYYY"
    )}`;
  };

  return (
    <CommonStyles.Box
      sx={{
        marginTop: "33px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "33px",
        }}
      >
        <CommonStyles.Box centered>
          <CommonStyles.IconButton
            onClick={() => handleChangeWeek("previous")}
            sx={{
              svg: {
                width: "25px",
                height: "25px",
              },
            }}
          >
            <Previous fill="#000" />
          </CommonStyles.IconButton>
          <CommonStyles.Typography
            type="bold16"
            sx={{
              color: "#000000",
              width: "fit-content",
              textAlign: "center",
            }}
          >
            {renderDate()}
          </CommonStyles.Typography>
          <CommonStyles.IconButton
            onClick={() => handleChangeWeek("next")}
            sx={{
              svg: {
                transform: "rotate(180deg)",
                width: "25px",
                height: "25px",
              },
            }}
          >
            <Previous fill="#000" />
          </CommonStyles.IconButton>
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            display: "flex",
            gap: "18px",
            "& .MuiFormControl-root": {
              background: "#fff",
              width: 160,
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["month"]}
              value={filters.startDate}
              onChange={(value) => handleChangeDate("month", value)}
            />
            <DatePicker
              views={["year"]}
              value={filters.endDate}
              onChange={(value) => handleChangeDate("year", value)}
            />
          </LocalizationProvider>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.CustomScheduler
        startDate={filters.startDate}
        endDate={filters.endDate}
        step={60}
        loading={isLoading}
        schedules={data}
      />
    </CommonStyles.Box>
  );
};

export default FilterAndScheduler;
