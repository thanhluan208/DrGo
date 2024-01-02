import React, { memo } from "react";
import CommonStyles from "../..";
import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";

const GroupingCellComponent = (props) => {
  //! State
  const theme = useTheme();
  const { group, ...restProps } = props;
  const infoPST = JSON.parse(group?.text || {});
  const { name, email, avg_rating, avatar, description } = infoPST;

  //! Function

  //! Render
  return (
    <td
      {...restProps}
      key={`${group.fieldName}_${group.id}`}
      style={{
        borderRight:
          group.id === 4
            ? "none"
            : `1px solid ${theme.colors.custom.borderColor}`,
      }}
    >
      <CommonStyles.Box
        sx={{
          height: "48px",
          padding: "0 12px 12px 12px",
          display: "flex",
          gap: "18px",
        }}
      >
        <CommonStyles.Avatar src={avatar} alt={name} />
        <CommonStyles.Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CommonStyles.Typography
            type="bold14"
            sx={{
              maxWidth: `${(window.innerWidth - 80) / 4 - 12 - 40 - 18 - 30}px`,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </CommonStyles.Typography>
          <Tooltip title={description} placement="bottom">
            <div>
              <CommonStyles.Box>
                <CommonStyles.Typography
                  type="normal14"
                  color="secondaryText"
                  sx={{
                    maxWidth: `${
                      (window.innerWidth - 80) / 4 - 12 - 40 - 18 - 30
                    }px`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {description}
                </CommonStyles.Typography>
              </CommonStyles.Box>
            </div>
          </Tooltip>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </td>
  );
};

export default memo(GroupingCellComponent);
