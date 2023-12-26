import { Checkbox } from "@mui/material";
import React, { Fragment, memo, useCallback, useEffect, useMemo } from "react";
import CommonStyles from "../..";
import { isArray } from "lodash";
import TableContentItem from "./TableContentItem";
import { useTheme } from "@emotion/react";
import CommonIcons from "../../../CommonIcons";
import Check from "../../../../assets/icons/Check";

const TableContent = ({
  rowData,
  calculateTemplate,
  columns,
  hasCheckbox,
  isOdd,
  selectedRows,
  handleSelectRow,
}) => {
  //! State
  const theme = useTheme();
  const isSelected = useMemo(() => {
    if (!selectedRows) return false;

    if (isArray(selectedRows)) {
      for (const row of selectedRows) {
        if (row?.id === rowData?.id) return true;
      }
    }

    return false;
  }, [selectedRows, rowData]);

  //! Function
  const onSelectRow = useCallback(() => {
    handleSelectRow(rowData);
  }, [handleSelectRow, rowData]);

  //! Render
  const renderContent = useCallback(() => {
    return (
      <Fragment>
        {columns.map((column) => {
          return (
            <TableContentItem
              item={column}
              data={rowData}
              isOdd={isOdd}
              key={`${column?.id}-${rowData?.id}`}
            />
          );
        })}
      </Fragment>
    );
  }, [columns, rowData, isOdd]);

  return (
    <CommonStyles.Box
      sx={{
        display: "grid",
        gridTemplateColumns: calculateTemplate,
        cursor: "pointer",
        transition: "all .3s ease-in-out",
        "&:hover": {
          background: theme.colors.custom.background,
        },
        overflow: "hidden",
      }}
    >
      {hasCheckbox && (
        <CommonStyles.Box
          centered
          sx={{
            padding: "16px",
            background: isOdd
              ? theme.colors.custom.backgroundSecondary
              : theme.colors.custom.background,
          }}
        >
          <CommonStyles.IconButton
            hasNoti={false}
            customSx={{
              width: "18px",
              height: "18px",
              background: isSelected
                ? theme.palette.primary.main
                : "transparent",
              border: `1px solid ${theme.palette.primary.main}`,
              padding: 0,
              "&:hover": {
                background: isSelected
                  ? theme.palette.primary.main
                  : "transparent",
                opacity: 0.8,
              },
            }}
            onClick={onSelectRow}
          >
            {isSelected ? <Check /> : ""}
          </CommonStyles.IconButton>
        </CommonStyles.Box>
      )}
      {renderContent()}
    </CommonStyles.Box>
  );
};

export default memo(TableContent);
