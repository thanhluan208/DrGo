import React, { memo, useState } from "react";
import MUISelect from "@mui/material/Select";
import { CircularProgress, MenuItem } from "@mui/material";
import CommonStyles from "..";
import CommonIcons from "../../CommonIcons";

const Select = ({
  options,
  renderValue,
  sx,
  sxContent,
  loading,
  ...otherProps
}) => {
  //! State
  const [selectOpen, setSelectOpen] = useState(false);

  //! Function

  //! Render
  return (
    <MUISelect
      onOpen={() => setSelectOpen(true)}
      onClose={() => setSelectOpen(false)}
      sx={{
        div: {
          paddingRight: "0 !important",
        },
        ...sx,
      }}
      renderValue={(value) => {
        const selectedOption = options.find((option) => option.value === value);
        let label = "";
        if (selectedOption) {
          label = selectedOption.label;
        }
        return (
          <CommonStyles.Box
            centered
            sx={{
              gap: "8px",

              ...sxContent,
            }}
          >
            {renderValue ? (
              renderValue(label)
            ) : (
              <CommonStyles.Typography type="normal14" color="primaryText">
                {label}
              </CommonStyles.Typography>
            )}
            <CommonIcons.SingleArrowLeft
              style={{
                transition: "all 0.3s ease",
                transform: !selectOpen ? "rotate(270deg)" : "rotate(90deg)",
              }}
            />
          </CommonStyles.Box>
        );
      }}
      IconComponent={(props) => {
        if (loading) {
          return <CircularProgress size={"1rem"} />;
        }
      }}
      {...otherProps}
    >
      {options.map((option) => {
        const { value, label } = option;
        return (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        );
      })}
    </MUISelect>
  );
};

export default memo(Select);
