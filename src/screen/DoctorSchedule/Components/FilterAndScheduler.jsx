import React, { useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Previous from "../../../assets/icons/Previous";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useFilter from "../../../hooks/useFilter";
import useGetSchedules from "../../../hooks/schedule/useGetSchedules";

const startDate = dayjs().startOf("day").add(9, "hour");
const endDate = dayjs().startOf("day").add(19, "hour");

const FilterAndScheduler = ({ doctor }) => {
  //! State
  const { filters, setFilters } = useFilter({
    doctor,
    date: dayjs(),
  });

  const { data, isLoading } = useGetSchedules(filters);

  console.log("data", data);

  //! Function
  const handleChangeWeek = (type) => {
    if (type === "previous") {
      setFilters((prev) => {
        return {
          ...prev,
          date: prev.date.subtract(1, "week"),
        };
      });
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          date: prev.date.add(1, "week"),
        };
      });
    }
  };

  //! Render
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
              width: 150,
              textAlign: "center",
            }}
          >
            {`${filters.date.format("MMMM")}, ${filters.date
              .startOf("week")
              .format("DD")}-${filters.date.endOf("week").format("DD")}`}
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
            <DatePicker views={["month"]} value={filters.date} />
            <DatePicker views={["year"]} value={filters.date} />
          </LocalizationProvider>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.CustomScheduler
        startDate={startDate}
        endDate={endDate}
        currentDate={filters.date}
        step={60}
        loading={isLoading}
        schedules={data}
      />
    </CommonStyles.Box>
  );
};

export default FilterAndScheduler;
