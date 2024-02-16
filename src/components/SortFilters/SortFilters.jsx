import React from "react";
import CommonStyles from "../CommonStyles";
import DropDownSort from "../../assets/icons/DropDownSort";
import { Popover } from "@mui/material";
import { isArray } from "lodash";

const uuid = Math.random().toString(36).substring(7);
const SortFilters = ({ value, options, id, handleChange }) => {
  //! State
  const [anchorEl, setAnchorEl] = React.useState(null);

  //! Function
  const handleClose = () => {
    setAnchorEl(null);
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box
        centered
        sx={{
          cursor: "pointer",
          gap: "10px",
          width: 158,
          background: "#fff",
          padding: "10px 0",
          borderBottom: !!anchorEl ? "1px solid #E0E0E0" : "none",
          borderRadius: !!anchorEl ? "4px 4px 0 0" : "4px",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <CommonStyles.Typography
          type="normal14"
          sx={{ fontWeight: 600, color: "#2563EB" }}
        >
          Sort By
        </CommonStyles.Typography>

        <DropDownSort
          style={{
            transform: !anchorEl ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all .5s ease",
          }}
        />
      </CommonStyles.Box>
      <Popover
        id={id || uuid}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          boxShadow: "none",
        }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
              borderRadius: "0 0 10px 10px",
              // paddingTop: "10px",
            },
          },
        }}
      >
        <CommonStyles.Box
          sx={{
            width: "158px",
          }}
        >
          {isArray(options) &&
            options.map((item, index) => {
              const isSelected = value === item?.value;

              return (
                <CommonStyles.Box
                  key={item?.value}
                  centered
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      background: isSelected ? "#2563EB" : "#F1F1F1",
                    },
                    background: isSelected ? "#2563EB" : "none",
                    borderRadius: isSelected ? "10px" : "none",
                  }}
                  onClick={() => {
                    handleChange(item);
                    handleClose();
                  }}
                >
                  <CommonStyles.Typography
                    type="normal14"
                    sx={{
                      fontWeight: 500,
                      color: isSelected ? "#fff" : "#A3A3A3",
                    }}
                  >
                    {item?.label}
                  </CommonStyles.Typography>
                </CommonStyles.Box>
              );
            })}
        </CommonStyles.Box>
      </Popover>
    </CommonStyles.Box>
  );
};

export default SortFilters;
