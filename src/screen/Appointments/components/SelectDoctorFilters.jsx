import React, { useMemo } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Previous from "../../../assets/icons/Previous";
import { ArrowDropDown } from "@mui/icons-material";
import DropDown from "../../../assets/icons/DropDown";
import { CircularProgress, Popover } from "@mui/material";
import { cloneDeep, isArray, isEmpty } from "lodash";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";

const SelectDoctorFilters = ({ value, handleChange }) => {
  //! State
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data, isLoading } = useGetListDoctor();

  const options = useMemo(() => {
    if (isEmpty(data)) return [];
    const nextData = cloneDeep(data).map((elm) => {
      return {
        ...elm,
        label: elm.name,
        value: elm.id,
      };
    });

    return nextData;
  }, [data]);

  //! Function
  const handleClose = () => {
    setAnchorEl(null);
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        width: "356px",
        cursor: "pointer",
      }}
    >
      <CommonStyles.Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
          height: "100%",
        }}
      >
        <CommonStyles.Box
          centered
          sx={{
            padding: "0 24px",
            background: "#F1F1F1",
          }}
        >
          <CommonStyles.Typography type="normal14" sx={{ fontWeight: 500 }}>
            Doctor
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <CommonStyles.Box
          centered
          sx={{
            justifyContent: "space-between",
            padding: "5px 20px",
            width: "260px",
          }}
        >
          <CommonStyles.Typography type="normal14">
            {value
              ? options.find((elm) => elm.value === value)?.label
              : "Select doctor"}
          </CommonStyles.Typography>

          {isLoading ? (
            <CircularProgress size="14px" />
          ) : (
            <DropDown
              style={{
                transform: !anchorEl ? "rotate(0deg)" : "rotate(180deg)",
                transition: "all .5s ease",
              }}
            />
          )}
        </CommonStyles.Box>
      </CommonStyles.Box>
      <Popover
        id="select-doctor-filters"
        open={!!anchorEl}
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
          sx={{
            width: "356px",
          }}
        >
          {isArray(options) &&
            options.map((item, index) => {
              return (
                <CommonStyles.Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom:
                      index === options?.length - 1
                        ? "none"
                        : ".5px solid #A3A3A3",
                    padding: "5px 10px 5px 20px",
                    "&:hover": {
                      background: "#F1F1F1",
                    },
                  }}
                  onClick={() => {
                    handleChange(item);
                    handleClose();
                  }}
                >
                  {item?.label}
                </CommonStyles.Box>
              );
            })}
        </CommonStyles.Box>
      </Popover>
    </CommonStyles.Box>
  );
};

export default SelectDoctorFilters;
