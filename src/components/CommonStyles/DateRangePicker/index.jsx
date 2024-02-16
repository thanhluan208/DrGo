import React, { useCallback, useState } from "react";
import CommonStyles from "..";
import { Popover, useTheme } from "@mui/material";
import Previous from "../../../assets/icons/Previous";
import Next from "../../../assets/icons/Next";
import dayjs from "dayjs";
import DropDown from "../../../assets/icons/DropDown";

const DateRangePicker = ({ value, onChange }) => {
  // const DateRangePicker = () => {
  //! State
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);

  //! Function
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDate = useCallback(
    (date) => {
      if (value?.[0] && value?.[1]) {
        if (date.isSame(value[0], "day") || date.isSame(value[1], "day")) {
          onChange([date, undefined]);
          return;
        }

        if (date.isAfter(value[0], "day") && date.isBefore(value[1], "day")) {
          const timeDiffStart = date.diff(value[0], "day");
          const timeDiffEnd = value[1].diff(date, "day");
          if (timeDiffStart > timeDiffEnd) {
            onChange([value[0], date]);
            return;
          } else {
            onChange([date, value[1]]);
            return;
          }
        }

        if (date.isAfter(value[1], "day")) {
          onChange([value[0], date]);
          return;
        }

        if (date.isBefore(value[0], "day")) {
          onChange([date, value[1]]);
          return;
        }
      }

      if (value?.[0] && !value?.[1]) {
        if (date.isAfter(value[0], "day")) {
          onChange([value[0], date]);
          return;
        }
        if (date.isBefore(value[0], "day")) {
          onChange([date, value[0]]);
          return;
        }
      }
    },
    [value]
  );

  //! Render
  const renderListDay = useCallback(() => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((elm) => {
      return (
        <CommonStyles.Box centered>
          <CommonStyles.Typography
            type="normal12"
            key={elm}
            sx={{
              color:
                elm === "Sun" || elm === "Sat"
                  ? theme.palette.primary.error
                  : "#000",
            }}
          >
            {elm}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      );
    });
  }, []);

  const renderDate = useCallback(() => {
    const startOfMonth = currentMonth.startOf("month").startOf("week");
    const endOfMonth = currentMonth.endOf("month").endOf("week");
    const result = [];
    let date = startOfMonth;
    while (date.isBefore(endOfMonth)) {
      result.push(date);
      date = date.add(1, "day");
    }

    return (
      <CommonStyles.Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, calc(100% / 7))",
          rowGap: "5px",
          width: "100%",
        }}
      >
        {result.map((elm, index) => {
          const isSameMonth = elm.format("MM") === currentMonth.format("MM");
          if (!isSameMonth) return <CommonStyles.Box></CommonStyles.Box>;

          let color = "#000";
          let background = "transparent";
          let borderRadius = "8px";

          const isToday =
            elm.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY");

          const isSelectedStart =
            value?.[0]?.format("DD/MM/YYYY") === elm.format("DD/MM/YYYY");

          const isSelectEnd =
            value?.[1]?.format("DD/MM/YYYY") === elm.format("DD/MM/YYYY");

          const isBetweenSelected =
            value?.[0]?.isBefore(elm, "day") && value?.[1]?.isAfter(elm, "day");

          if (isToday) {
            color = theme.palette.primary.main;
          }

          if (isSelectedStart) {
            color = "#fff";
            borderRadius = "8px 0 0 8px";
            background = theme.palette.primary.main;
          }

          if (isSelectedStart && !value?.[1]) {
            borderRadius = "8px";
          }

          if (isSelectEnd) {
            color = "#fff";
            borderRadius = "0 8px 8px 0";
            background = theme.palette.primary.main;
          }

          if (isBetweenSelected) {
            borderRadius = "0";
            background = "#2563eb30";
          }

          if (elm.format("ddd") === "Sat") {
            borderRadius = "0 8px 8px 0";
          }

          if (elm.format("ddd") === "Sun") {
            borderRadius = "8px 0 0 8px";
          }

          return (
            <CommonStyles.IconButton
              customSx={{
                background,
                borderRadius,
                transition: "all .5s ease",
                "&:hover": {
                  background,
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
                },
              }}
              onClick={() => {
                handleSelectDate(elm);
              }}
            >
              <CommonStyles.Typography
                type="normal12"
                sx={{
                  color: color,
                }}
              >
                {elm.format("D")}
              </CommonStyles.Typography>
            </CommonStyles.IconButton>
          );
        })}
      </CommonStyles.Box>
    );
  }, [currentMonth, value, handleSelectDate]);

  return (
    <CommonStyles.Box
      sx={{
        width: "100%",
      }}
    >
      <CommonStyles.Box
        sx={{
          width: "100%",
          padding: "0 20px ",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <CommonStyles.Typography type="normal14">
          {value
            ? `${value[0].format("DD/MM/YYYY")} ${
                value?.[1] ? `- ${value[1].format("DD/MM/YYYY")}` : ""
              }`
            : "Select Date"}
        </CommonStyles.Typography>

        <DropDown
          style={{
            transform: !anchorEl ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all .5s ease",
          }}
        />
      </CommonStyles.Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          marginTop: "10px",
        }}
      >
        <CommonStyles.Box
          centered
          sx={{
            borderRadius: "11px",
            background: "#fff",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
            padding: "15px 20px 40px 20px",
            width: "308px",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <CommonStyles.Box
            centered
            sx={{
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
              svg: {
                width: "20px",
                height: "20px",
              },
            }}
          >
            <CommonStyles.IconButton
              onClick={() => {
                setCurrentMonth(currentMonth.subtract(1, "month"));
              }}
            >
              <Previous fill="#000" />
            </CommonStyles.IconButton>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                fontWeight: 500,
              }}
            >
              {currentMonth.format("MMMM YYYY")}
            </CommonStyles.Typography>
            <CommonStyles.IconButton
              onClick={() => {
                setCurrentMonth(currentMonth.add(1, "month"));
              }}
            >
              <Next fill={"#000"} />
            </CommonStyles.IconButton>
          </CommonStyles.Box>
          <CommonStyles.Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(7, calc(100% / 7))",
            }}
          >
            {renderListDay()}
          </CommonStyles.Box>
          {renderDate()}
        </CommonStyles.Box>
      </Popover>
    </CommonStyles.Box>
  );
};

export default DateRangePicker;
